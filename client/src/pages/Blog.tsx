import { useParams } from 'react-router-dom';
import { FullBlog } from '../components/FullBlog';
import { useBlog } from '../hooks/blogs'
import { AppBar } from '../components/Appbar';
import Spinner from '../components/Spinner';

export const Blog = () => {
  const { id } = useParams();
  const {loading, blog} = useBlog({
    id: id || ""
  });
  
  if (loading) {
  return (
    <div className="h-screen flex flex-col">
      <AppBar />
      <div className="flex flex-grow justify-center items-center">
        <Spinner />
      </div>
    </div>
  );
}


  if (!blog) {
    return <div>Blog not found!</div>;
  }

  return (
    <div>
      <FullBlog blog={blog}/>
    </div>
  )
}
