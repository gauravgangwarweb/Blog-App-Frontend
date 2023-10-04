import crypto from 'crypto'

const generateSignature =  async (public_id, api_secret) => {
    const apiKey = process.env.NEXT_PUBLIC_API_KEY
    const timestamp = new Date().getTime();
    const params = [
      apiKey,
      timestamp,
      public_id,
    ];
    params.sort();
    const stringToSign = params.join('&');
    const signature = crypto.createHash('sha1').update(stringToSign).digest('hex');
    return signature;
}

export default generateSignature