import formidable from 'formidable'; 
import fs from 'fs'; 
const projectId = '133940048241';
const location = 'eu';
const processorId = 'cdc9675865e1c54c';
const {DocumentProcessorServiceClient} = require('@google-cloud/documentai').v1;

export default async function handler(req, res) { 
    if (req.method === 'POST') { 
        const form = new formidable.IncomingForm(); 
        form.parse(req, async (err, fields, files) => { 
            if (err) { console.error('Error parsing form:', err); 
        return res.status(500).json({ error: 'Error parsing form' }); 
    } 
    const { path: filePath, name: fileName } = files.file; 

    async function processDocument() {
    const client = new DocumentProcessorServiceClient();
    const name = `projects/${projectId}/locations/${location}/processors/${processorId}`;

    const fs = require('fs').promises;
    const imageFile = await fs.readFile(filePath);

    const encodedImage = Buffer.from(imageFile).toString('base64');

    const request = {
    name,
    rawDocument: {
        content: encodedImage,
        mimeType: 'application/pdf',
    },
    };

    const [result] = await client.processDocument(request);
    const {document} = result;

    const {text} = document;
    console.log({text})
    }

    const response = await axios.post('https://eu-documentai.googleapis.com/v1/projects/133940048241/locations/eu/processors/cdc9675865e1c54c:process', { 
        file: fs.createReadStream(filePath), 
    }); 
    const result = response.data; 
    res.status(200).json({ message: 'Document processing started successfully' }); 
}); 
} else { res.status(405).json({ error: 'Method not allowed' }); } }