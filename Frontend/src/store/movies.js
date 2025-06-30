const array = [
    {
        key:1,
        name:"Deadpool",
        type:"Movies",
        Year:"2024",
        quality:"HD",
        img:"25915.jpg"
    },
    {
        key:2,
        name:"IT",
        type:"Movies",
        Year:"2024",
        quality:"HD",
        img:"37943.jpg"
    },
    {
        key:3,
        name:"Black Panther",
        type:"Movies",
        Year:"2024",
        quality:"HD",
        img:"37945.jpg"
    },
    {
        key:4,
        name:"Assassin",
        type:"Movies",
        Year:"2024",
        quality:"HD",
        img:"329624.jpg"
    },
    {
        key:5,
        name:"Justice League",
        type:"Movies",
        Year:"2024",
        quality:"HD",
        img:"329653.jpg"
    },
    {
        key:6,
        name:"Tron",
        type:"Movies",
        Year:"2024",
        quality:"HD",
        img:"329760.jpg"
    },
    {
        key:7,
        name:"Peres",
        type:"Movies",
        Year:"2024",
        quality:"HD",
        img:"522304.jpg"
    },
    {
        key:8,
        name:"Mad Max",
        type:"Movies",
        Year:"2024",
        quality:"HD",
        img:"681619.jpg"
    },
    {
        key:9,
        name:"Bridge",
        type:"Movies",
        Year:"2024",
        quality:"HD",
        img:"681626.jpg"
    },
    {
        key:10,
        name:"Hellboy",
        type:"Movies",
        Year:"2024",
        quality:"HD",
        img:"681688.jpg"
    },
    {
        key:11,
        name:"Transformers",
        type:"Movies",
        Year:"2024",
        quality:"HD",
        img:"681743.jpg"
    },
    {
        key:12,
        name:"Peres",
        type:"Movies",
        Year:"2024",
        quality:"HD",
        img:"681818.jpg"
    }

];
const tvImages = [
    "tv1.jpg",
    "tv2.jpg",
    "tv3.jpg",
    "tv4.jpg",
    "tv5.jpg",
    "tv6.jpg",
    "tv7.jpg",
    "tv9.jpg",
    "tv9.jpg",
    "tv10.jpg",
    "tv11.jpg",
    "tv12.jpg"
];
const tvNames = [
    "Sherlock",
    "Salem",
    "The Witcher",
    "LOST",
    "Arrow",
    "Merlin",
    "Supernatural",
    "Power",
    "Huntsman",
    "King Arthur",
    "Succession",
    "Gotham"
];

const tvArray = tvImages.map((img, idx) => ({
    key: idx + 1,
    name: tvNames[idx],
    type: "TV Shows",
    Year: Math.floor(Math.random() * (2024 - 2010 + 1)) + 2010, 
    quality: "HD",
    img:"/TV/"+img
}));

export {array as movies,tvArray};
