export const likedpost = (data) => ({
    type: "LIKED_POST",
    data
})
export const deleteComment = (data) => ({
    type: "DELETE_COMMENT",
    data
})
export const editComment = (data) => ({
    type: "EDIT_COMMENT",
    data
})
export const replyComment = (postid,commentid,data) => ({
    type: "EDIT_COMMENT",
    postid,commentid,data
})

export const addComment = (data) => ({
    type: "ADD_COMMENT",
    data
})
export const addReply = (data) => ({
    type: "ADD_REPLY",
    data
})
export const deleteReply = (data) => ({
    type: "DELETE_REPLY",
    data
})
export const editReply = (data) => ({
    type: "EDIT_REPLY",
    data
})