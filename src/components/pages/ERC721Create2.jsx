import React, {useEffect, useState} from "react";
import "../CSS/ERC721Create.css";
import { create as ipfsHttpClient } from "ipfs-http-client";
import { useForm } from 'react-hook-form';
import axios from "axios";
import ReactLoading from "react-loading";
import {Buffer} from "buffer";
import Web3 from "web3";
import {ethers} from "ethers"
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSelector } from 'react-redux';
import ERC721ABI from "../../ABI721/ERC721.sol/MultiTokenERC721.json"
// import handle from "../../redux/reducer/address";
window.Buffer = Buffer;
const PROJECT_ID = process.env.REACT_APP_PROJECT_ID;
const INFURA_KEY = process.env.REACT_APP_INFURA_SECRET_KEY;
const web3 = new Web3(Web3.givenProvider || process.env.REACT_APP_API_URL);

const authorization = "Basic " + Buffer.from(PROJECT_ID + ":" + INFURA_KEY).toString("base64");

const ERC721Create = () => {
    const getAddress = useSelector(state => state.address);


    const { register, handleSubmit} = useForm();
    const [isLoading, setIsLoading] = useState(false);
    const [imageFile, setImageFile] = useState(null);
    const ipfs = ipfsHttpClient({
        url: "https://ipfs.infura.io:5001",
        headers: {
            authorization,
        },
    });
    //phoo-2
    const handleImageUpload = async (event) => {
        const file = event.target.files[0];
        if (!file) return;
        setImageFile(file);
    };
    console.log("address is:", getAddress); //redux


///    ON SUBMIT
//     const submitData = async (data) => {
//     setIsLoading(true);
//
//     if(window.ethereum) {
//     const provider = new ethers.providers.Web3Provider(window.ethereum);
//     const signer = provider.getSigner();
//
//     const contract = new ethers.Contract("0x2E5d994CA738ae8B83277ce361A4A68180324dD1",
//             ERC721ABI.abi,provider
//         );
//         console.log(contract)
//
//     // if (!imageFile || !data.nftName || !data.description || !data.price) {
//     //     setIsLoading(false);
//     //     return;
//     // }
//
//
//     const result = await ipfs.add(imageFile);
//     const nftURI = `https://ipfs.io/ipfs/${result.path}`;
//     const metadata = {name: data.nftName, description: data.description, image: nftURI};
//     const metaDataJSON = await ipfs.add(Buffer.from(JSON.stringify(metadata)));
//     let metaDataURI = `https://ipfs.io/ipfs/${metaDataJSON.path}`;
//     //
//     // data.price = web3.utils.toWei(data.price, "ether");
//     // data.nftURI = nftURI;
//     // data.metaDataURI = metaDataURI;
//     // console.log("getAddress is", getAddress);
//     // data.userAddress = getAddress;
//     // console.log("data", data);
//
//
//
//
//     setIsLoading(false);
// }
//     };
    const submitData = async (data) => {
        console.log("in onSubmit");
        setIsLoading(true);
        if(window.ethereum) {
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner();

            const contract = new ethers.Contract("0x2E5d994CA738ae8B83277ce361A4A68180324dD1",
                ERC721ABI.abi, signer
            );
            console.log(contract)

            try {
                const result = await ipfs.add(imageFile);
                const nftURI = `https://ipfs.io/ipfs/${result.path}`;
                const metadata = { name: data.nftName, description: data.description, image: nftURI };
                const metaDataJSON = await ipfs.add(Buffer.from(JSON.stringify(metadata)));
                const metaDataURI = `https://ipfs.io/ipfs/${metaDataJSON.path}`;
                const priceInWei = ethers.utils.parseEther(data.price);
                console.log("priceinWei is", priceInWei);
                return;

                console.log("data are", data);
                const tokenID = Number(await contract.tokenId());
                console.log("tokenID", tokenID);
                const tx = await contract.mint(
                    data.nftName,
                    priceInWei,
                    data.description,
                    nftURI,
                    metaDataURI
                );
                await tx.wait();
                console.log("finally hash", tx.hash);
                if (tx.hash) {
                    const mintingData = {
                        tokenID: tokenID,
                        nftName: data.nftName,
                        price: priceInWei,
                        description: data.description,
                        nftURI: nftURI,
                        metaDataURI: metaDataURI,
                        generateReceipt : tx.hash,
                    };
                    axios.post(process.env.REACT_APP_API_HOST + "/mintERC721", mintingData)
                        .then(response => {
                            console.log('Backend response:', response.data);
                        })
                        .catch(error => {
                            console.error('Error sending data to backend:', error);
                        });
                }
                toast.success("NFT minted successfully");
            } catch (error) {
                console.error("Error minting NFT:", error);
                toast.error("Error minting NFT. Please try again.");
            }
            setIsLoading(false);
        }
    };

    return (
        <>
            { isLoading && (
                <div className="loader-container">
                    <p>NFT is minting...</p>
                    <ReactLoading type="spin" color="cyan" height={80} width={90} />
                </div>
            )}
            <div className={`content-container ${isLoading ? 'blur-background' : ''}`}>
            <div className="title">
                <h1>Mint NFT</h1>
            </div>
            <div className="mint-nft-page">
                <form onSubmit={handleSubmit(submitData)}>
                    <div className="form-container">

                        <div className="form-group w-100">
                            <label className="image-upload1">Upload Image</label>
                            <input
                                className="image-upload"
                                type="file"
                                accept=" image/*"
                                onChange={handleImageUpload}
                            />
                        </div>
                        <div className="form-group w-100">
                            <label className="left-align-label">Name</label>
                            <input
                                className="input-field"
                                type="text"
                                {...register('nftName')}
                            />
                        </div>
                        <div className="form-group">
                            <label>Price</label>
                            <input
                                className="input-field"
                                type="text"
                                {...register('price')}
                            />
                        </div>
                        <div className="form-group w-100">
                            <label>Description</label>
                            <textarea
                                className="textarea-field"
                                {...register('description')}
                            />
                        </div>
                    </div>
                    <button type="submit" className="btn btn-primary w-25 mint-button">Mint NFT</button>
                    <ToastContainer position="top-center" />
                </form>
            </div>
        </div>
        </>
    );
};

export default ERC721Create;