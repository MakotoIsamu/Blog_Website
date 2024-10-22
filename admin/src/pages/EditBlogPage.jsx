import React from 'react'
import { useParams } from 'react-router-dom';

const EditBlogPage = () => {
    const { id } = useParams();
    const [blog, setBlog] = useState(null);

    useEffect(() => {
        const fetchBlog = async () => {
            const response = await fetch('');
        }
    }, [id]);
  return (
    <div>
        <h1>Edit Blog</h1>
    </div>
  )
}

export default EditBlogPage