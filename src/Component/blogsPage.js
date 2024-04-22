import { useState,useRef,useEffect} from "react";
import './blogPage.css';
import { useReducer } from "react";
import { db } from "../firebaseInit";
import { collection, addDoc,onSnapshot,deleteDoc ,doc} from "firebase/firestore"; 
//import { getDocs } from "firebase/firestore"; 

function blogsReducer(state, action) {
  switch (action.type) {
      case "INITIALIZE":
          return action.Blogs;
      // case "ADD":
      //     return [action.Blogs, ...state];
      case "REMOVE":
          return state.filter((blog, index) => index !== action.index);
      default:
          return state;
  }
}


function BlogsPage(){
    const[formData,setformData]=useState({Title:"",Content:""});
    //We dont use this two state we use a object instand of this two object
    // const [Title, setTitle] = useState("");
    // const [Content, setContent] = useState("");

    //Instrad of this we use useReducer hook
    // const [Blogs, setBlog] = useState([]);
    
    const[Blogs,dispatch] = useReducer(blogsReducer,[]);

    const titleRef = useRef(null);


    //When rerender happening then focus automaticlly on title
    useEffect(()=>{
      titleRef.current.focus();
    },[]);

    useEffect(()=>{
        
      //   async function fetchData(){
      //   const querySnapshot = await getDocs(collection(db, "blogs"));
       
      //  // doc.data() is never undefined for query doc snapshots
      //    const blogs  = querySnapshot.docs.map((doc)=>{
      //     return {
      //       id:doc.id,
      //       ...doc.data()
      //     }
      //    });
      //    console.log(blogs);
        
          
      //     dispatch({ type: "INITIALIZE", Blogs: blogs});
        
         
        
       
      // }
      // fetchData();
      const unsub = onSnapshot(collection(db, "blogs"), (snapShot) => {
      
        const blogs  = snapShot.docs.map((doc)=>{
              return {
                id:doc.id,
                ...doc.data()
              }
             });
             console.log(unsub);
            
              
              dispatch({ type: "INITIALIZE", Blogs: blogs});

    });



    },[]);
    // When add then i want to change title in page title 
    useEffect(()=>{
        if(Blogs.length && Blogs[0].Title){
            document.title=Blogs[0].Title;
        }else{
          document.title="No blogs !";
        }
    },[Blogs]);




    async function handleAdd(e){
        e.preventDefault();

        //we use listener in initial render then not need of that
        //dispatch({type:"ADD",Blogs:{Title:formData.Title,Content:formData.Content}})
       // Add a new document with a generated id.
       //Collection have db and collection on database in firebase
       //docRef is corrent data ID 
        const docRef = await addDoc(collection(db, "blogs"), {
        Title: formData.Title,
        Content: formData.Content,
        createdOn:new Date()
        });
        console.log("Document written with ID: ", docRef.id);


       
        // setBlog({Title,Content});
        //setBlog([{Title:formData.Title,Content:formData.Content},...Blogs]);//this is importent what comes first or what come next
        console.log(Blogs);
        //After add it not display array because it is a asynchronous operation then we use rest operator
        setformData({Title:"",Content:""});

        //After add item focus change in title
        titleRef.current.focus();
    }



    async function removeBlog(id) {
      try {
          // Constructing the correct collection reference
          const docRef = doc(db, "blogs", id);
          await deleteDoc(docRef);
          // If deletion is successful, update the state
          dispatch({ type: "REMOVE", id: id });
      } catch (error) {
          console.error("Error removing document: ", error);
      }
  }
  
  
  return(
    <>
     <div className="blogPage">
        <h1>Write a Blog !</h1>
       <div className="blogBox">
         <div className="Title">
            <lable htmlFor="title">Title</lable>
            <input className='title' type='text' placeholder='Enter the title here...' value={formData.Title} 
            ref={titleRef}
            onChange={(e)=>{
                // setTitle(e.target.value);
                //You have to be carefully to setformData of all objects
                setformData({Title:e.target.value,Content:formData.Content});
            }}></input>
         </div>
         <div className="Content">
            <label htmlFor='content'>Content</label>
            <input className="content" type='text' placeholder='Content goes here...' value={formData.Content} onChange={(e)=>{
                setformData({Title:formData.Title,Content:e.target.value});
            }}></input>
         </div>
         <div className='addButton'>
            <button onClick={handleAdd}>ADD</button>
         </div>
         <hr/>
       </div>
       <div className="view">
         <h2>Blogs</h2>
         {Blogs.map((blog,i)=>( 
            <div className="blog" key={i}>
              <h2>{blog.Title}</h2>
              <p>{blog.Content}</p>
              <div className="blog-btn">
                <button onClick={()=>removeBlog(blog.id)} className="btn-remove">
                   Delete
                </button>
              </div>
            </div> 
         ))}
           
         
       </div>
     </div>
    </>
  )
}
export default BlogsPage;