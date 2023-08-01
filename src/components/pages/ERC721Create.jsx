import React, { useState } from "react";
import "../CSS/ERC721Create.css";
import { create as ipfsHttpClient } from "ipfs-http-client";
import { useForm } from 'react-hook-form';
import axios from "axios";
import ReactLoading from "react-loading";
import {Buffer} from "buffer";
import {Upload} from "antd";
window.Buffer = Buffer;

const { PROJECT_ID, INFURA_KEY, INFURA_ENDPOINT } = process.env;
const authorization = "Basic " + Buffer.from(PROJECT_ID + ":" + INFURA_KEY).toString("base64");

const ERC721Create = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [imageHash, setImageHash] = useState("");
    const { register, handleSubmit} = useForm();
    const ipfs = ipfsHttpClient({
        url: INFURA_ENDPOINT,

        headers: {
            authorization,
        },
    });

    const submitData = async (data) => {
        console.log("data", data);
        setIsLoading(true);
        try {
            const response = await axios.post('http://localhost:9090/mintERC721', data, {
                headers: {
                    "Content-Type": "application/json"
                },
            });
            console.log(response.data);
        } catch (error) {
            console.error('Error:', error);
        }
        setIsLoading(false);
    };

    const beforeUpload = (file) => {
        const isPNG = file.type === "image/jpg" || file.type === "image/png" || file.type === "image/jpeg" || file.type === "image/gif";
        const isSizeValid = file.size / 1024 / 1024 <= 10;
        if ( (!isPNG) || (!isSizeValid) ) {
            alert("File format or size is not acceptable");
        }
        return (isPNG && isSizeValid);
    };

    const handleImageUpload = async (e) => {
        try {
            const file = e.target.files[0];
            const { cid } = await ipfs.add(file);
            setImageHash(cid.toString());
            console.log("image hash is here", cid.toString());
        }
        catch (e) {
            console.error(e)
        }
    }

    return (
        <>
            <div className={`overlay ${isLoading ? 'active' : ''}`}>
                {isLoading && (
                    <div className="loader-container">
                        <p><strong>NFT is minting...</strong></p>
                        <ReactLoading type="spin" color="cyan" height={60} width={70}/>
                    </div>
                )}
            </div>

            <div className="title">
                <h1>Mint NFT</h1>
            </div>
            <div className="mint-nft-page">
                <form onSubmit={handleSubmit(submitData)}>
                    <div className="form-container">

                        <div className="form-group w-100">
                            <label className="image-upload1">Upload Image</label>
                            <Upload
                                className="image-upload"
                                type="file"
                                onChange={handleImageUpload}
                                beforeUpload={beforeUpload}
                            />
                        </div>

                        {/*<div className="form-group w-100">*/}
                        {/*  <label className="left-align-label">Name</label>*/}
                        {/*  <input*/}
                        {/*      className="input-field"*/}
                        {/*      type="text"*/}
                        {/*      {...register('nftName')}*/}
                        {/*  />*/}
                        {/*</div>*/}

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
                        <div className="form-group w-100">
                            <label className="left-align-label">TokenURI</label>
                            <input
                                className="input-field"
                                type="text"
                                {...register('tokenURI')}
                            />
                        </div>
                    </div>
                    <button type="submit" className="btn btn-primary w-25 mint-button">
                        Mint NFT
                    </button>
                </form>
            </div>
        </>
    );
};

export default ERC721Create;