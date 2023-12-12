'use strict';

async function main(projectId, location, processorId, filePath) {
  const projectId = '133940048241';
  const location = 'eu';
  const processorId = 'cdc9675865e1c54c';

  const {DocumentProcessorServiceClient} =
    require('@google-cloud/documentai').v1;

  const client = new DocumentProcessorServiceClient();

  async function processDocument() {
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

    const getText = textAnchor => {
      if (!textAnchor.textSegments || textAnchor.textSegments.length === 0) {
        return '';
      }

      const startIndex = textAnchor.textSegments[0].startIndex || 0;
      const endIndex = textAnchor.textSegments[0].endIndex;

      return text.substring(startIndex, endIndex);
    };

    console.log('The document contains the following paragraphs:');
    const [page1] = document.pages;
    const {paragraphs} = page1;

    for (const paragraph of paragraphs) {
      const paragraphText = getText(paragraph.layout.textAnchor);
      console.log(`Paragraph text:\n${paragraphText}`);
    }

    console.log('\nThe following form key/value pairs were detected:');

    const {formFields} = page1;
    for (const field of formFields) {
      const fieldName = getText(field.fieldName.textAnchor);
      const fieldValue = getText(field.fieldValue.textAnchor);

      console.log('Extracted key value pair:');
      console.log(`\t(${fieldName}, ${fieldValue})`);
    }
  }
  await processDocument();
}

main(...process.argv.slice(2)).catch(err => {
  console.error(err);
  process.exitCode = 1;
});