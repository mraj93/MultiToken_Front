import React, {useEffect, useState} from "react";
import "../CSS/ERC721Create.css";
import { create as ipfsHttpClient } from "ipfs-http-client";
import { useForm } from 'react-hook-form';
import axios from "axios";
import ReactLoading from "react-loading";
import {Buffer} from "buffer";
import Web3 from "web3";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
window.Buffer = Buffer;
const PROJECT_ID = process.env.PROJECT_ID;
const INFURA_KEY = process.env.INFURA_SECRET_KEY;
const web3 = new Web3(Web3.givenProvider || process.env.API_URL);
const authorization = "Basic " + Buffer.from(PROJECT_ID + ":" + INFURA_KEY).toString("base64");

const ERC721Create = () => {
    const { register, handleSubmit} = useForm();
    const [isLoading, setIsLoading] = useState(false);
    const [imageFile, setImageFile] = useState(null);
    const ipfs = ipfsHttpClient({
        url: "https://ipfs.infura.io:5001",
        headers: {
            authorization,
        },
    });

    useEffect( () => {
        console.log("in log")
        console.log("logs", process.env.PROJECT_ID);
        console.log("2", process.env.INFURA_SECRET_KEY);
    }, [])

    const handleImageUpload = async (event) => {
        const file = event.target.files[0];
        if (!file) return;
        setImageFile(file);
    };

    const submitData = async (data) => {
        setIsLoading(true);

        if (!imageFile || !data.nftName || !data.description || !data.price) {
            setIsLoading(false);
            return;
        }

        const result = await ipfs.add(imageFile);
        const nftURI = `https://ipfs.io/ipfs/${result.path}`;
        const metadata = {
            name: data.nftName, description: data.description, image: nftURI
        };
        const metaDataJSON = await ipfs.add(Buffer.from(JSON.stringify(metadata)));
        let metaDataURI = `https://ipfs.io/ipfs/${metaDataJSON.path}`;

        data.price = web3.utils.toWei(data.price, "ether");
        data.nftURI = nftURI;
        data.metaDataURI = metaDataURI;

        try {
            const response = await axios.post(process.env.API_HOST + "/mintERC721", data, {
                headers: {
                    "Content-Type": "application/json"
                },
            });
            if (response.status === 200) {
                toast.success("NFT Minted Successfully", {autoClose: 2000});
                window.location.reload();
            }
        } catch (error) {
            console.error("Error:", error);
            toast.error("Error occurred while minting", {autoClose: 2000});
        }
        setIsLoading(false);
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