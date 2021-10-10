import React, { useEffect, useState, useRef } from "react"
import { useSelector,useDispatch } from "react-redux"
import { addComment, deleteComment, editComment, likedpost, deleteReply, addReply, editReply } from "../actions/actions"
import Modal from 'react-modal'
import like from "../assets/like.png"
import likeactive from "../assets/like-active.png"
import comment from "../assets/comment.png"
import reducer from "../reducers/reducer"


export default function PostComponent(props) {
    
    const posts=useSelector(state=>state.reducer['POSTS'])
    const dispatch=useDispatch();
    const [data,setData]=useState([])
    const [selectedItem,setSelectedItem]=useState({})
    const [editClick,setEditClick]=useState(false);
    const [replyClick,setReplyClick]=useState(false);
    const [editText,setEditText]=useState('')
    const [commentid,setCommentid]=useState('')
    const [postid,setPostid]=useState('')
    const [replyid,setReplyid]=useState('')
    const [commentText,setCommentText]=useState('')
    const [modal, setModal] = useState(false);
    const closeModal = () => {setModal(false);}
    const customStyles1 = {
        overlay: {
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(8, 8, 8, 0.8)",
            backdropFilter: "blur(1px)",
        },
        content: {
            position: "absolute",
            width: "80%",
            height: "80%",
            top: "50%",
            left: "50%",
            right: "0px",
            bottom: "0px",
            transform: "translate(-50%, -50%)",
            margin: "unset",
            borderRadius: "8px",
            background: "#fff",
            overflow: "auto",
            WebkitOverflowScrolling: "touch",
            outline: "none",
            padding: 0,
            border: "none",
        },
    };
    
    useEffect(()=>{

        if(posts!==undefined)
        setData(posts)
        
    },[posts])

    const handleAddComment=()=>{
        if(commentText!==''){
        let obj={}
        obj['user']='user01'
        obj['replies']=[]
        obj['comment']=commentText
        obj['id']=selectedItem.comments.length+1
        dispatch(addComment( {postid:selectedItem.id, data: obj}))
        setCommentText('');
        }
    }
    const handleAddReply=()=>{
        if(editText!==''){
        let obj={}
        obj['user']='user01'
        obj['comment']=editText
        obj['id']=selectedItem.comments[+commentid-1].replies.length+1
        dispatch(addReply( {postid:selectedItem.id,commentid:commentid, data: obj}))
        setEditText('');
        setReplyClick(false);
        }
    }
    const handleEdit=()=>{
        if(editText!=='' && editClick==true && replyid==''){  
            setEditClick(false);
            dispatch(editComment({postid:postid,commentid:commentid,editText:editText}));
            setEditText(''); 
        }
        else if(editText!=='' && editClick==true && replyid!==''){
            setEditClick(false);
            dispatch(editReply({postid:postid,commentid:commentid,replyid:replyid, editText:editText}));
            setEditText(''); 
            setReplyid('');
        }
    }
    return (
        <div>
        {
        data.map(element => {
          return(
            <div className='postbody' key={'post'+element.id}>
            
            <img className='post-img' src={element.data}></img>
            <div className='postfooter'>
                 <img src={element.liked?likeactive:like} onClick={()=>{dispatch(likedpost(element.id))}}></img>
                 <img src={comment} onClick={()=>{setSelectedItem(element);setModal(true)}}></img>

            </div>
            <div className='viewall' onClick={()=>{setSelectedItem(element); setModal(true)}}>{'View all '+element.comments.length+' comments' }</div>
            {element.comments[0]? <div className='comment-display'><span style={{fontWeight:'bold'}}>{element.comments[0].user}&nbsp;&nbsp;</span><span>{element.comments[0].comment}</span></div>:<div className='comment-display'>No Comments Yet</div>}
            {
                element.comments[1]?
                <div className='comment-display'><span style={{fontWeight:'bold'}}>{element.comments[1].user}&nbsp;&nbsp;</span><span>{element.comments[1].comment}</span></div>
                :null
            }


            
            </div>  
          )  
        })
            }
            <Modal isOpen={modal} onRequestClose={closeModal} style={customStyles1} >
                <div className='post-modal'>
                <img style={{width:'60%',marginLeft:'3px'}} src={selectedItem.data}></img>
                <div className='comment-wrapper'>
                <div className='comment-section'>
                    {   selectedItem.comments?selectedItem.comments.length>0?
                        selectedItem.comments.map(item=>{
                            return(
                                <div key={'comment'+item.id}>
                                <div className='comment-display'><span style={{fontWeight:'bold'}}>{item.user}&nbsp;&nbsp;</span><span>{item.comment}</span></div>
                                <div className='comment-options'>
                                    <div onClick={()=>{setReplyClick(true);setCommentid(item.id);setPostid(selectedItem.id)}}>Reply</div>
                                    <div onClick={()=>{dispatch(deleteComment({postid: selectedItem.id,commentid: item.id}))}}>Delete</div>
                                    <div onClick={()=>{setEditText(item.comment);setEditClick(true);setCommentid(item.id);setPostid(selectedItem.id)}}>Edit</div>
                                </div>
                                {
                                    item.replies.length>0?
                                    item.replies.map(reply=>{
                                        return(
                                            <div style={{marginLeft:'30px'}} key={'reply'+reply.id}>
                                                <div className='reply-display'><span style={{fontWeight:'bold'}}>{reply.user}&nbsp;&nbsp;</span><span>{reply.comment}</span></div>
                                                <div className='reply-options'>
                                                    <div onClick={()=>{setReplyClick(true);setCommentid(item.id);setPostid(selectedItem.id)}}>Reply</div>
                                                    <div onClick={()=>{dispatch(deleteReply({postid: selectedItem.id,commentid: item.id,replyid:reply.id}))}}>Delete</div>
                                                    <div onClick={()=>{setEditText(reply.comment);setEditClick(true);setCommentid(item.id);setPostid(selectedItem.id);setReplyid(reply.id)}}>Edit</div>
                                                </div>
                                            </div>
                                        )
                                    })
                                    :null
                                }
                                </div>
                            )
                        })
                        :null:null
                    }
                </div>
                <div className='post-comment'>
                        {replyClick? <div>@user01</div>:null}
                        <input placeholder='Add a comment...' onChange={e=>{if(editClick==false  && replyClick==false)setCommentText(e.target.value);else  setEditText(e.target.value)}} value={editClick || replyClick ?editText : commentText}></input>
                        {
                         editClick?   
                         <div className={editText!==''?'post-text-active':'post-text'} onClick={()=>{handleEdit()}}>Edit</div>
                        
                        :
                        replyClick?
    
                        <div className={editText!==''?'post-text-active':'post-text'} onClick={()=>{handleAddReply()}}>Reply</div>

                        :
                        <div className={commentText!==''?'post-text-active':'post-text'} onClick={()=>{handleAddComment()}}>Post</div>
                        }
                    </div>
                </div>
                </div>
            </Modal>
        </div>
        )
}
