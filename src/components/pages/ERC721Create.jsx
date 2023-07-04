import React, {useState} from "react";
import '../CSS/ERC721Create.css'

const ERC721Create = () => {
    const [category, setCategory] = useState('');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState('');

    const handleCategoryChange = (e) => {
        setCategory(e.target.value);
    };

    const handlePriceChange = (e) => {
        setPrice(e.target.value);
    };

    const handleDescriptionChange = (e) => {
        setDescription(e.target.value);
    };

    const MintNFT = () => {
        console.log("Mint Success with parameters", {
            category,
            description,
            price
        } )
    }
    const handleImageChange = () => {
        console.log("Image Uploaded")
    }

    const handleFileChange = () => {
        console.log("Image Uploaded")
    }

    return (
        <>
            <div className="title">
                <h1>Mint NFT</h1>
            </div>
            <div className="mint-nft-page">
                <form>
                    <div className="form-container">
                    <div className="form-group w-100">
                        <label className="image-upload1">Upload Image</label>
                        <input
                            className="image-upload"
                            type="file"
                            id="image"
                            onChange={handleImageChange}
                        />
                    </div>

                    <div className="form-group w-100">
                        <label className="left-align-label">Category</label>
                        <input
                            className="input-field"
                            type="text"
                            id="category"
                            value={category}
                            onChange={handleCategoryChange}
                        />
                    </div>
                    <div className="form-group">
                        <label>Price</label>
                        <input
                            className="input-field"
                            type="text"
                            id="price"
                            value={price}
                            onChange={handlePriceChange}
                        />
                    </div>
                    <div className="form-group w-100">
                        <label>Description</label>
                        <textarea
                            className="textarea-field"
                            id="description"
                            value={description}
                            onChange={handleDescriptionChange}
                        />
                    </div>
                    </div>
                    <button type="button " className="btn btn-primary w-25 mint-button" onClick={MintNFT}>
                        Mint NFT
                    </button>
                </form>
            </div>
        </>
    )
}

export default ERC721Create;
