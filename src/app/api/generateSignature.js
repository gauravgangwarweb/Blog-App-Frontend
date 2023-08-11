import crypto from 'crypto'

const generateSignature =  async (timestamp, public_id, api_secret) => {

    const signature = crypto
        .createHash('sha1')
        .update(`public_id=${public_id}&timestamp=${timestamp}${api_secret}`)
        .digest('hex');

    return signature
}

export default generateSignature