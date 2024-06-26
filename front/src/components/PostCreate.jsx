import React,{ useState,Component } from 'react';
import axios from 'axios';
import cookie from 'react-cookies';
import { StandaloneSearchBox } from '@react-google-maps/api';

function JoingPostCreate(){
    const [postIMG,setImg] = useState("");
    const [type,setType] = useState("");
    const [title,setTitle] = useState("");
    const [registeredDate,setRegisteredDate] = useState("");
    const [registeredTime,setRegisteredTime] = useState("");
    const [activityDate,setActivityDate] = useState("");
    const [activityTime,setActivityTime] = useState("");
    const [minPeople,setMinPeople] = useState(0);
    const [maxPeople,setMaxPeople] = useState(0);
    const [location,setLocation] = useState("");
    const [price,setPrice] = useState(0);
    const [content,setContent] = useState("");
    const [imgPreview, setImgPreview] = useState('');
    const host = cookie.load('userID')
    const [searchBox, setSearchBox] = useState(null);

    //Google map------------------
    const handleSearchBoxLoad = (ref) => {
        setSearchBox(ref);
    };

    const handlePlacesChanged = () => {
        if (searchBox) {
            const places = searchBox.getPlaces();
            console.log(places);
            setLocation(places[0].name);
        }
    };
    const goToGoogleMap = () => {
        window.open(`https://www.google.com/maps/search/?api=1&query=${location}`, '_blank');
    };
    
    //--------------------
    let today = new Date().toISOString().split('T')[0];


    const handleImageChange = (e) => {
        const reader = new FileReader();
        const file = e.target.files[0];

        reader.onloadend = () => {
            setImg(file);
            setImgPreview(reader.result);
        };

        if (file) {
            reader.readAsDataURL(file);
        }
    }
    
    //------------------
    if(cookie.load('userID')) {
        const createPost=(e) =>{
            e.preventDefault();
            if(postIMG){
                var formData = new FormData();
                formData.append("postIMG", postIMG);
                formData.append("type", type);
                formData.append("title", title);
                formData.append("registeredDate", registeredDate);
                formData.append("registeredTime", registeredTime);
                formData.append("activityDate", activityDate);
                formData.append("activityTime", activityTime);
                formData.append("minPeople", minPeople);
                formData.append("maxPeople", maxPeople);
                formData.append("location", location);
                formData.append("price", price);
                formData.append("content", content);
                formData.append("host", host);
    
                console.log(formData);
                
                axios.post("http://localhost:8000/post/create", formData)
                .then(response => {
                    console.log("Post created successfully:", response);
                    window.location = (cookie.load('userID')) ? "/Joing/index/" + cookie.load('userID') : "/";
                })
                .catch(error => {
                    console.error("Error creating post:", error);
                });
            }
        }
        
        return (
            <div className="main">
                <div className="container">
                    <div className="create">
                        <form action="" method="" onSubmit={createPost}>
                            <div className="post_img">
                                {imgPreview && <img src={imgPreview} alt="Preview" />}
                            </div>
                            <div className="settingItem row">
                                <label className="settingItemTitle row"><h3>上</h3><h3>傳</h3><h3>圖</h3><h3>片:</h3></label>
                                <input type="file" id="imageInput" accept="image/*" multiple={false} onChange={handleImageChange} name='postIMG' required/>    
                            </div>
                            <div className="settingItem row">
                                <label htmlFor="type" className="settingItemTitle row"><h3>類</h3><h3>別:</h3></label>
                                <select name="type" onChange= {(Event) =>{setType(Event.target.value)}} required>
                                    <option value="">請選擇---</option>
                                    <option value="0">運動</option>
                                    <option value="1">手作</option>
                                    <option value="2">吃喝</option>
                                    <option value="3">電影</option>
                                    <option value="4">展覽</option>
                                    <option value="5">其他</option>
                                </select>
                            </div>
                            <div className="settingItem row">
                                <label htmlFor="title" className="settingItemTitle row"><h3>標</h3><h3>題:</h3></label>
                                <input type="text" name="title" onChange={(Event) =>{setTitle(Event.target.value)}} required/>
                            </div>
                            <div className="settingItem row">
                                <label htmlFor="registeredDate" className="settingItemTitle row"><h3>揪</h3><h3>團</h3><h3>時</h3><h3>間:</h3></label>
                                <input type="date" min={today} onChange={(Event) =>{setRegisteredDate(Event.target.value)}} name="registeredDate" required/>
                                <input type="time" onChange={(Event) =>{setRegisteredTime(Event.target.value)}} name="registeredTime" required/>
                            </div>
                            <div className="settingItem row">
                                <label htmlFor="activityDate" className="settingItemTitle row"><h3>活</h3><h3>動</h3><h3>時</h3><h3>間:</h3></label>
                                <input type="date" min={today} onChange={(Event) =>setActivityDate(Event.target.value)} name="activityDate"/>
                                <input type="time" onChange={(Event) =>{setActivityTime(Event.target.value)}} name="activityTime" required/>
                            </div>
                            <div className="settingItem row">
                                <label htmlFor="location" className="settingItemTitle row"><h3>地</h3><h3>點:</h3></label>
                                <StandaloneSearchBox onLoad={handleSearchBoxLoad} onPlacesChanged={handlePlacesChanged}>
                                    <input id="searchInput" type="text" onChange={(Event) =>{setLocation(Event.target.value)}} required/>
                                </StandaloneSearchBox>
                                <button id="searchButton" className="btn btn_orange"  onClick={goToGoogleMap}>查看地圖</button>
                            </div>
                            <div className="settingItem row">
                                <label htmlFor="minPeople" className="settingItemTitle row"><h3>最</h3><h3>少</h3><h3>人</h3><h3>數:</h3></label>
                                <input type="number" onChange={(Event) =>{setMinPeople(Event.target.value)}}  name="minPeople"  min="0" required/>
                                <p className="remarks">(不限人數請選0)</p>
                            </div>
                            <div className="settingItem row">
                                <label htmlFor="maxPeople" className="settingItemTitle row"><h3>最</h3><h3>多</h3><h3>人</h3><h3>數:</h3></label>
                                <input type="number" onChange={(Event) =>{setMaxPeople(Event.target.value)}} name="maxPeople" min="0" required/>
                                <p className="remarks">(不限人數請選0)</p>
                            </div>
                            <div className="settingItem row">
                                <label htmlFor="price" className="settingItemTitle row"><h3>每</h3><h3>人</h3><h3>費</h3><h3>用:</h3></label>
                                    <input type="number" value={price} onChange={(Event) =>{setPrice(Event.target.value)}} name="price" min="0" required />
                            </div>
                            <div className="settingItem">
                                <label htmlFor="introduction" className="settingItemTitle row"><h3>內</h3><h3>文:</h3></label>
                                <textarea name="introduction" id="" cols="30" rows="10" onChange={(Event) =>{setContent(Event.target.value)}} required></textarea>
                            </div>
                            <div className="btn_group">
                                <button className="btn btn_orange" type='submit'>確定</button>
                                <a href="/" className="btn btn_gray">取消</a>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    }else{
        alert("請先登入");
    }

    
}
 
export default JoingPostCreate;