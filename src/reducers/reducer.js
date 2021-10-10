
const initialState = {
  "POSTS":[
      {
      id:'1',    
      data:'https://static.toiimg.com/thumb/msid-54559212,width-748,height-499,resizemode=4,imgsize-307081/Bangalore.jpg',
      liked:false,
      comments:[{
          id:'1',
          user:'user01',
          comment:'Very Beautiful',
          replies:[{
            id:'1',
            user:'user01',
            comment:'I agree'
          },{
            id:'2',
            user:'user01',
            comment:'I dont like it'
          }]
      },
      ]
  },
  {
    id:'2',
    data:'https://i.ytimg.com/vi/c8CkE1gWVz0/maxresdefault.jpg',
    liked:false,
    comments:[{
        id:'1',
        user:'user01',
        comment:'Very Beautiful',
        replies:[{
            id:'1',
        user:'user01',
        comment:'nice'
        }]
    },
    {   
        id:'2',
        user:'user02',
        comment:'Scenic',
        replies:[
            {id:'1',
        user:'user01',
        comment:'nope'}
        ]
    }]
},
{
    id:'3',
    data:'https://www.deccanherald.com/sites/dh/files/styles/article_detail/public/article_images/2020/05/19/file7a22jhw1vh2rkm19ggb-2005819332-1586376423.jpg?itok=bgnTJEkI',
    liked:false,
    comments:[{
        id:'1',
        user:'user01',
        comment:'Very Beautiful',
        replies:[]
    },
    {
        id:'2',
        user:'user02',
        comment:'Mindblowing',
        replies:[]
    }]
},
{
    id:'4',    
    data:'https://static.toiimg.com/thumb/msid-54559212,width-748,height-499,resizemode=4,imgsize-307081/Bangalore.jpg',
    liked:false,
    comments:[{
        id:'1',
        user:'user01',
        comment:'Very Beautiful',
        replies:[{
          id:'1',
          user:'user01',
          comment:'I agree'
        },{
          id:'2',
          user:'user01',
          comment:'I dont like it'
        }]
    },
    ]
},
{
  id:'5',
  data:'https://i.ytimg.com/vi/c8CkE1gWVz0/maxresdefault.jpg',
  liked:false,
  comments:[{
      id:'1',
      user:'user01',
      comment:'Very Beautiful',
      replies:[{
          id:'1',
      user:'user01',
      comment:'nice'
      }]
  },
  {   
      id:'2',
      user:'user02',
      comment:'Scenic',
      replies:[
          {id:'1',
      user:'user01',
      comment:'nope'}
      ]
  }]
},
{
  id:'6',
  data:'https://www.deccanherald.com/sites/dh/files/styles/article_detail/public/article_images/2020/05/19/file7a22jhw1vh2rkm19ggb-2005819332-1586376423.jpg?itok=bgnTJEkI',
  liked:false,
  comments:[{
      id:'1',
      user:'user01',
      comment:'Very Beautiful',
      replies:[]
  },
  {
      id:'2',
      user:'user02',
      comment:'Mindblowing',
      replies:[]
  }]
}
]
  
}


function reducer(state = initialState, action) {
  switch (action.type) {
    case "LIKED_POST":
      console.log(action)
      var newArray=[...state.POSTS] 
      newArray[+action.data-1].liked=!newArray[+action.data-1].liked

      return{
          ...state,POSTS:newArray
      }

      case "EDIT_COMMENT":
        var newArray=[...state.POSTS] 
        newArray[+action.data.postid-1].comments[+action.data.commentid-1].comment=action.data.editText;
        return{
            ...state,POSTS:newArray
        }

        case "EDIT_REPLY":
            console.log(action);
        var newArray=[...state.POSTS] 
        newArray[+action.data.postid-1].comments[+action.data.commentid-1].replies[+action.data.replyid-1].comment=action.data.editText;
        return{
            ...state,POSTS:newArray
        }

        case "ADD_COMMENT":
            console.log(action);
        var newArray=[...state.POSTS] 
        newArray[+action.data.postid-1].comments.push(action.data.data)
        return{
            ...state,POSTS:newArray
        }

        case "ADD_REPLY":
            console.log(action);
        var newArray=[...state.POSTS] 
        newArray[+action.data.postid-1].comments[+action.data.commentid-1].replies.push(action.data.data)
        return{
            ...state,POSTS:newArray
        }

        case "DELETE_COMMENT":
            console.log(action)
            var newArray=[...state.POSTS]
            newArray[+action.data.postid-1].comments=newArray[+action.data.postid-1].comments.filter(item=>
             item.id!==action.data.commentid
            )
            return{
                ...state,POSTS:newArray
            }

            case "DELETE_REPLY":
            console.log(action)
            var newArray=[...state.POSTS]
            newArray[+action.data.postid-1].comments[+action.data.commentid-1].replies=newArray[+action.data.postid-1].comments[+action.data.commentid-1].replies.filter(item=>
             item.id!==action.data.replyid
            )
            return{
                ...state,POSTS:newArray
            }

    default:
      return state
  }
}

export default reducer