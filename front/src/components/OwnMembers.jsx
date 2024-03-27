import React, { useState, useEffect} from 'react';
import axios from 'axios';
import cookie from 'react-cookies'
import { useParams } from 'react-router-dom';
import Header from "./header";


const Members = (props) => {
    const id = cookie.load('userID');
    const [memberData, setMemberData] = useState({});
    const [recordData, setRecordData] = useState([]);
    const [joinRdData, setjoinRdData] = useState([]);
    const [collectData, setcollectData] = useState([]);
    //-----------------------
    const toggleLogoIn = (e) => {
        const logoIn = document.querySelector(".logoIn");
        logoIn.classList.remove("show");
    }
    const fetchlikeData = async() => {
        try{
            const collectResponse = await axios.get(`http://localhost:8000/collect/${id}`);
            console.log(collectResponse)
            if (collectResponse.data) {
                setcollectData(collectResponse.data);
            } else {
                console.log("No data returned");
                setcollectData([]);
            }
        }catch (error) {
            console.error('Error fetching data:', error);
        }
    }
    const deleteCollect = async (event ,postID) => {
        event.preventDefault();
        var result = await axios.delete(`http://localhost:8000/collect/delete/${id}/${postID}`);
        if(result.data['success']){
            fetchlikeData();
        }
    }
    useEffect(() => {
        const fetchMemberData = async () => {
            try {
                const memberResponse = await axios.get(`http://localhost:8000/members/${id}`);
                setMemberData(memberResponse.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        const fetchrecordData = async()=>{
            try{
                const recordResponse = await axios.get(`http://localhost:8000/record/${id}`);
                setRecordData(recordResponse.data);
            }catch (error) {
                console.error('Error fetching data:', error);
            }
        }
        const fetchjoinRdData = async()=>{
            try{
                const joinRdResponse = await axios.get(`http://localhost:8000/joinrecord/${id}`);
                setjoinRdData(joinRdResponse.data);
            }catch (error) {
                console.error('Error fetching data:', error);
            }
        }
        fetchrecordData();
        fetchjoinRdData();
        fetchMemberData();
        fetchlikeData();
    }, [id,]);
    //memberNavBtn--------------
    const toggleMemberMainBody = (btnId, mainBodyClass, titleText) => {
        document.querySelectorAll(".memberNavBtn").forEach(body => {
            body.classList.remove("show");
        });
        document.querySelector(`#${btnId}`).classList.add("show");
    
        document.querySelectorAll(".memberMainBody").forEach(body => {
            body.classList.remove("show");
        });
        document.querySelector(`.${mainBodyClass}`).classList.add("show");
        document.querySelector(".memberMain h2").textContent = titleText;
    };

    const btn_setting = () => toggleMemberMainBody("settingBtn", "setting", "帳號設定");
    const btn_note = () => toggleMemberMainBody("noteBtn", "note", "訊息通知");
    const btn_record = () => toggleMemberMainBody("recordBtn", "record", "揪團紀錄");
    const btn_joinRecord = () => toggleMemberMainBody("joinRecordBtn", "joinRecord", "參加紀錄");
    const btn_like = () => toggleMemberMainBody("likeBtn", "like", "已收藏");
    return (    
        <React.Fragment>
        <Header id={id}/>
        <div className="main" onClick={toggleLogoIn}>
            <div className="container row member">
                <div className="memberNav">
                    <div className="memberNavBtn show row" id="settingBtn" onClick={btn_setting}>
                        <img src="http://localhost:3000/images/setting_icon.png" alt=""/>
                        <h3 className="p_letter">帳號資訊</h3>
                    </div>
                    <div className="memberNavBtn row" id="noteBtn" onClick={btn_note}>
                        <img src="http://localhost:3000/images/notification_icon.png" alt=""/>
                        <h3 className="p_letter">訊息通知</h3>
                    </div>
                    <div className="memberNavBtn row" id="recordBtn" onClick={btn_record}>
                        <img src="http://localhost:3000/images/jiu_icon.png" alt=""/>
                        <h3 className="p_letter">揪團紀錄</h3>
                    </div>
                    <div className="memberNavBtn row" id="joinRecordBtn" onClick={btn_joinRecord}>
                        <img src="http://localhost:3000/images/join_icon.png" alt=""/>
                        <h3 className="p_letter">參加紀錄</h3>
                    </div>
                    <div className="memberNavBtn row" id="likeBtn" onClick={btn_like}>
                        <img src="http://localhost:3000/images/like_icon.png" alt=""/>
                        <h3 className="p_letter">已收藏</h3>
                    </div>
                </div>
                <div className="memberMain">
                    <h2>帳號資訊 </h2>
                    {/* setting */}
                    <div className="memberMainBody setting show">
                        <div className="btn_group">
                            <a href={"/Joing/memberedit/"+ id} className="btn btn_blue">編輯</a>
                        </div>
                        <div className="member_img">
                            <img src={memberData.headShot} alt=""/>
                        </div>
                        <div className="settingItem row">
                            <div className="settingItemTitle  row">
                                <h3>會</h3><h3>員</h3><h3>名</h3><h3>稱:</h3>
                            </div>
                            <p>{memberData.userName}</p>
                        </div>
                        <div className="settingItem row">
                            <div className="settingItemTitle  row">
                                <h3>信</h3><h3>箱:</h3>
                            </div>
                            <p>{memberData.userEmail}</p>
                        </div>
                        <div className="settingItem row">
                            <div className="settingItemTitle  row">
                                <h3>性</h3><h3>別:</h3>
                            </div>
                            <p>{memberData.sex==0?"男":
                                memberData.sex==1?"女":
                                memberData.sex==2?"其他":"不公開"}</p>
                        </div>
                        <div className="settingItem row">
                            <div className="settingItemTitle  row">
                                <h3>生</h3><h3>日:</h3>
                            </div>
                            <p>{memberData.birth}</p>
                        </div>
                        <div className="settingItem">
                            <div className="settingItemTitle  row">
                                <h3>自</h3><h3>我</h3><h3>介</h3><h3>紹:</h3>
                            </div>
                            <p>{memberData.introduction} </p>
                        </div>

                    </div>

                    {/* note */}
                    <div className="memberMainBody note">
                        <div className="noteBox">
                            <div className="noteBoxTop row">
                                <div className="time">
                                    <p>2024/04/03</p>
                                    <p>18:00</p>
                                </div>
                                <div className="subject">
                                    <h3>您的揪團已有人申請</h3>
                                </div>
                                <button className="delet"><img src="http://localhost:3000/images/trash_icon.png" alt=""/></button>
                            </div>
                            <div className="noteBoxTContent">
                                <p>會員名稱 已申請參加您的揪團:  台中玩桌遊</p>
                            </div>
                        </div>
                        <div className="noteBox">
                            <div className="noteBoxTop row">
                                <div className="time">
                                    <p>2024/04/03</p>
                                    <p>18:00</p>
                                </div>
                                <div className="subject">
                                    <h3>您的參加申請已通過</h3>
                                </div>
                                <button className="delet"><img src="http://localhost:3000/images/trash_icon.png" alt=""/></button>
                            </div>
                            <div className="noteBoxTContent">
                                <p>會員名稱 已通過您的申請:  礁溪泡溫泉</p>
                            </div>
                        </div>
                        <div className="noteBox">
                            <div className="noteBoxTop row">
                                <div className="time">
                                    <p>2024/04/03</p>
                                    <p>18:00</p>
                                </div>
                                <div className="subject">
                                    <h3>您的參加申請已被婉拒</h3>
                                </div>
                                <button className="delet"><img src="http://localhost:3000/images/trash_icon.png" alt=""/></button>
                            </div>
                            <div className="noteBoxTContent">
                                <p>會員名稱 已婉拒您的申請:  台南喝牛肉湯</p>
                            </div>
                        </div>
                    </div>

                    {/* record */}
                    <div className="memberMainBody record">
                        {recordData.map((record,index)=>(
                            <a href={'/Joing/ownpost/' +record.postID } className="memberEvent">
                                <div className="memberEventImg">
                                    <img src={record.postIMG} alt=""/>
                                </div>
                                <div className="memberEventContentBlock">
                                    <h3>{record.title}</h3>
                                    <div className="content_box_group">
                                        <div className="content_box">
                                            <p>
                                                <span className="p_letter">活動時間</span>
                                                {record.activityDate} {record.activityTime}
                                            </p>
                                        </div>
                                        <div className="content_box box_blue">
                                            <p>
                                                <span className="p_letter">地點:</span>
                                                {record.location}
                                            </p>
                                        </div>
                                        <div className="content_box">
                                            <p>
                                                <span className="p_letter">每人金額:</span>
                                                {record.price}
                                            </p>
                                        </div>
                                    </div>   
                                </div>
                                
                                <div className="memberEventJoiner">
                                    <div>
                                        <h4>申請人</h4>
                                        <div className="memberEventAvatar">

                                        {record.join.map(m => {
                                            if (m.joinL === "C") {
                                                return (
                                                    <div className="member_img" key={m.userID}>
                                                        <a href={"/Joing/members/" + m.userID}>
                                                            <img src={m.headShot} alt="" />
                                                        </a>
                                                    </div>
                                                );
                                            } else {

                                            }
                                        })}
                                        </div>
                                    </div>
                                    <div>
                                        <h4>已參加</h4>
                                        <div className="memberEventAvatar">
                                            {record.join.map(m => {
                                                if (m.joinL === "Y") {
                                                    return (
                                                        <div className="member_img" key={m.userID}>
                                                            <a href={"/Joing/members/" + m.userID}>
                                                                <img src={m.headShot} alt="" />
                                                            </a>
                                                        </div>
                                                    );
                                                } else {

                                                }
                                            })}
                                        </div>
                                    </div>
                                </div>
                            </a>   
                        ))}
                    </div>

                    {/* joinRecord */}
                    <div className="memberMainBody joinRecord">
                        {joinRdData.map((join,index)=>{
                            return(
                                <a href={'/Joing/post/' +join.postID } className="memberEvent">
                                    <div className="memberEventImg">
                                        <img src={join.postIMG} alt=""/>
                                    </div>
                                    <div className="memberEventContentBlock">
                                        <h3>{join.title}</h3>
                                        <div className="content_box_group">
                                            <div className="content_box">
                                                <p>
                                                    <span className="p_letter">活動時間</span>
                                                    {join.activityDate} {join.activityTime}
                                                </p>
                                            </div>
                                            <div className="content_box box_blue">
                                                <p>
                                                    <span className="p_letter">地點:</span>
                                                    {join.location}
                                                </p>
                                            </div>
                                            <div className="content_box">
                                                <p>
                                                    <span className="p_letter">每人費用:</span>
                                                    500 
                                                </p>
                                            </div>
                                        </div>
                                        
                                    </div>
                                    <div className="memberEventJoiner">
                                        <div>
                                            <h4>主揪人</h4>
                                            <div className="memberEventAvatar">

                                                <a href="" className="member_img">
                                                    <img src={join.headShot} alt=""/>
                                                </a>
                                            </div>
                                        </div>
                                        <div>
                                            <h4>已參加</h4>
                                            <div className="memberEventAvatar">
                                                {join.join.map(m => {
                                                    return (
                                                        <div className="member_img" key={m.userID}>
                                                            <img src={m.headShot} alt="" />
                                                        </div>
                                                    );
                                                })}
                                            </div>
                                        </div>
                                    </div>
                                </a>
                            );
                        })}
                    </div>

                    {/* like */}
                    <div className="memberMainBody like">
                        {collectData.map((collect,index)=>{
                            return(
                                <a href={'/Joing/post/' + collect.postID } className="memberEvent">
                                    <button className="delet"  onClick={ (event) => {deleteCollect(event, collect.postID)}}><img src="http://localhost:3000/images/trash_icon.png" alt=""/></button>
                                    <div className="memberEventImg">
                                        <img src={collect.postIMG} alt=""/>
                                    </div>
                                    <div className="memberEventContentBlock">
                                        <h3>{collect.title}</h3>
                                        <div className="content_box_group">
                                            <div className="content_box">
                                                <p>
                                                    <span className="p_letter">活動時間</span>
                                                    {collect.activityDate} {collect.activityTime}
                                                </p>
                                            </div>
                                            <div className="content_box box_blue">
                                                <p>
                                                    <span className="p_letter">地點:</span>
                                                    {collect.location}
                                                </p>
                                            </div>
                                            <div className="content_box">
                                                <p>
                                                    <span className="p_letter">每人費用:</span>
                                                    {collect.price}
                                                </p>
                                            </div>
                                        </div>
                                        
                                    </div>
                                    <div className="memberEventJoiner">
                                        <div>
                                            <h4>主揪人</h4>
                                            <div className="memberEventAvatar">
                                                <div className="member_img">
                                                    <img src={collect.headShot} alt=""/>
                                                </div>
                                            </div>
                                        </div>
                                        <div>
                                            <h4>已參加</h4>
                                            <div className="memberEventAvatar">
                                                {collect.join.map(m => {
                                                    return (
                                                        <div className="member_img" key={m.userID}>
                                                            <img src={m.headShot} alt="" />
                                                        </div>
                                                    );
                                                })}
                                            </div>
                                        </div>
                                    </div>
                                </a>   

                            )
                        })}
                    </div>

                </div>

            </div>
        </div>
        </React.Fragment>
    ) 
}
export default Members;
