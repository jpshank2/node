const rp = require("request-promise");
const fs = require("fs");


exports.reddit = function () {
    let articles = []

    let options = {
        uri: "https://www.reddit.com/r/popular.json",
        headers: {
            "User-Agent": "Request-Promise"
        },
        json: true
    }

    rp(options)
        .then((res) => {
            console.log("request successful")
            return res
        })
        .then(data => {
            data.data.children.forEach(item => {
                let article = {
                    title: item.data.title,
                    author: item.data.author,
                    url: item.data.url
                }
                articles.push(article)
                fs.writeFileSync("popular-articles.json", JSON.stringify(articles), err => {
                    if (err) {
                        throw err
                    }
                })

            })

            // fs.writeFileSync("popular-articles.json", JSON.stringify(articles), err => {
            //     if (err) {
            //         throw err
            //     }
            // })

            console.log("articles successful")
            // console.log(articles)
        })

    fs.readFile("./popular-articles.json", "utf8", (err, data) => {
        if (err) {
            throw err
        }
        let obj = JSON.parse(data)
        obj.forEach(object => {
            console.log(object.title)
        })
    })
}