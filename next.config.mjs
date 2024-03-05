/** @type {import('next').NextConfig} */
const nextConfig = {
    async rewrites(){
        return[{
            source: '/api/:path*',
            destination: 'https://mock.apifox.com/m1/2398938-0-default/api/:path*'
        }]
    }
};

export default nextConfig;
