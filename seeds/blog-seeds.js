
const Blog = require('../models/blog')

const blogData = [
    {
        "name": "John",
        "title": "Rate my set up!",
        "picture": "https://preview.redd.it/fnvm9m3kwry91.jpg?width=960&crop=smart&auto=webp&s=35887abccaf080718c2f11f657a70f0a503ce873",
        "rating": 65,
        "user_id": 1

    },
    {
        "name": "James",
        "title": "Got this sick gaming chair today",
        "picture": "https://i.redd.it/38w990lkkfm41.jpg",
        "rating": 34,
        "user_id": 2

    },
    {
        "name": "Billy",
        "title": "HiGround FTW",
        "picture": "https://i.redd.it/778yf3snxnv71.jpg",
        "rating": 93,
        "user_id": 3

    }
    
]

const seedBlogs = () => Blog.bulkCreate(blogData);

module.exports = seedBlogs;