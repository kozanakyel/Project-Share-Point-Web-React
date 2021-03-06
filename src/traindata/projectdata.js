export default function createRandomImg(){
    const number = Math.floor(Math.random() * 4) + 1;
    return `/samples/${number}.jpg`;
}

const projectData = [
    {
        avatar: 'U',
        category: 'ziraat',
        title: 'Ziraat Project',
        date: '26-12-2021',
        image: createRandomImg(),
        // eslint-disable-next-line no-multi-str
        content: 'Machine Learning Projects Ideas for Beginners with \
        Source Code in Python 2022-Interesting machine learning project ideas \
        to kick-start a career in machine learning.',
        comments: [
            
        ]
    },
    {
        avatar: 'T',
        categiry: 'biology',
        title: 'Biology Project',
        date: '26-12-2021',
        image: createRandomImg(),
        // eslint-disable-next-line no-multi-str
        content: 'Machine Learning Projects Ideas for Beginners with \
        Source Code in Python 2022-Interesting machine learning project ideas \
        to kick-start a career in machine learning.',
        comments: [
            {
                commentor: 'vesile',
                comment: 'absolutely amazing peojects how can handle them'
            },
            {
                commentor: 'ali',
                comment: 'yok boyle birsey biz yillardir ugrasiyoruz spor kulubu'
            },
            {
                commentor: 'enes',
                comment: 'absolutely amazing peojects how can handle them'
            },
        ]
    },
    {
        avatar: 'U',
        category: 'iot',
        title: 'Face detection Project',
        date: '26-12-2021',
        image: createRandomImg(),
        // eslint-disable-next-line no-multi-str
        content: 'Machine Learning Projects Ideas for Beginners with \
        Source Code in Python 2022-Interesting machine learning project ideas \
        to kick-start a career in machine learning.',
        comments: [
            {
                commentor: 'vesile',
                comment: 'absolutely amazing peojects how can handle them'
            },
            {
                commentor: 'ali',
                comment: 'yok boyle birsey biz yillardir ugrasiyoruz spor kulubu'
            },
            {
                commentor: 'enes',
                comment: 'absolutely amazing peojects how can handle them'
            },
        ]
    }

]

export { projectData };