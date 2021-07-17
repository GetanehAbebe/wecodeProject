import axios from 'axios'
import { useState } from 'react'

function Form() {
    const [image, setImage] = useState([])
    const handleChange = (e) => {
        const file = e.target.files
        console.log('222', file);
        setImage(file)

    }
    const handleSubmit = (e) => {

        console.log('aaaa');
        const data = new FormData()
        console.log(data);
        data.append('image', image)
      
        axios.post("http://localhost:3200/images/image", data).then(res => console.log(res))
        e.preventDefault()
    }
    console.log(image);
    return <form className='form-inner' encType="multipart/form-data" action="/images">
        <div className='form-inner'>
            <input type="file" name='image' onChange={(e) => handleChange(e)} />
            <button type="submit" onClick={(e) => handleSubmit(e)} >upload</button>
        </div>

    </form>
}
export default Form