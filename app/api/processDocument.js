import formidable from 'formidable'; 
import fs from 'fs'; 

export default async function handler(req, res) { 
    if (req.method === 'POST') { 
        const form = new formidable.IncomingForm(); 
        form.parse(req, async (err, fields, files) => { 
            if (err) { console.error('Error parsing form:', err); 
        return res.status(500).json({ error: 'Error parsing form' }); 
    } 
    const { path: filePath, name: fileName } = files.file; 
    const response = await axios.post('https://eu-documentai.googleapis.com/v1/projects/133940048241/locations/eu/processors/cdc9675865e1c54c:process', { 
        file: fs.createReadStream(filePath), 
    }); 

    const result = response.data; 
    res.status(200).json({ message: 'Document processing started successfully' }); 
}); 
} else { res.status(405).json({ error: 'Method not allowed' }); } }