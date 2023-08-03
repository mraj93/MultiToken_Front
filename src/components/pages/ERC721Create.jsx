import React, { useState } from "react";
import "../CSS/ERC721Create.css";
import { create as ipfsHttpClient } from "ipfs-http-client";
import { useForm } from 'react-hook-form';
import axios from "axios";
import ReactLoading from "react-loading";
import {Buffer} from "buffer";
import {Upload} from "antd";
window.Buffer = Buffer;
const PROJECT_ID = process.env.PROJECT_ID;
const INFURA_SECRET_KEY = process.env.INFURA_SECRET_KEY;

const authorization = "Basic " + Buffer.from(PROJECT_ID + ":" + INFURA_SECRET_KEY).toString("base64");

const ERC721Create = () => {
    const { register, handleSubmit} = useForm();
    const [isLoading, setIsLoading] = useState(false);
    const [imageHash, setImageHash] = useState("");
    const [metadataURI, setMetadataURI] = useState("");
    const ipfs = ipfsHttpClient({
        url: "https://ipfs.infura.io:5001",
        headers: {
            authorization,
        },
    });

    const submitData = async (data) => {
        console.log("data", data);
        setIsLoading(true);

        const metadata = {
            name: data.nftName,
            description: data.description,
            image: imageHash
        };
        const metaDataJSON = Buffer.from(JSON.stringify(metadata));
        const uploadMetaData = await ipfs.add(metaDataJSON);
        console.log("MetaData path:",  uploadMetaData.path);
        setMetadataURI(uploadMetaData.path);

        data.tokenURI = imageHash;
        data.metaDataURI = metadataURI;

        try {
            const response = await axios.post('http://localhost:9090/mintERC721', data, {
                headers: {
                    "Content-Type": "application/json"
                },
            });
            console.log(response.data);
            if (response.status === 200) {
                alert("Mint Successfully..");
                window.location.reload();
            }
        } catch (error) {
            console.error('Error:', error);
        }
        setIsLoading(false);
    };

    const handleImageUpload = async (event) => {
        const file = event.target.files[0];
        if (!file) return;

        try {
            const result = await ipfs.add(file);
            const ipfsHash = result.path;
            const imageURI = `https://ipfs.io/ipfs/${result.path}`;
            setImageHash(imageURI);
        } catch (error) {
            console.error ('Error uploading file to IPFS:', error);
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
                    <button type="submit" className="btn btn-primary w-25 mint-button">
                        Mint NFT
                    </button>
                </form>
            </div>
        </div>
        </>
    );
};

export default ERC721Create;