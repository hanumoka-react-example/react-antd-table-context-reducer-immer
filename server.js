const jsonServer = require('json-server')
const server = jsonServer.create()
const router = jsonServer.router('db.json')
const middlewares = jsonServer.defaults()

const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')
const adapter = new FileSync('db.json')
const db = low(adapter)

server.use(middlewares)

/**
 * 서버 페이지네션
 * 파라미터 : currentPage , pageSize
 * 리턴 데이터: {
 *     msg:
 *     code:
 *     data:{
 *         data:[
 *             테이블 데이터 배열
 *         ]
 *         , totalCnt : 전체 데이터 개수
 *         , currentPage: 현제 페에지 번호
 *         , pageSize: 페이지 사이즈
 *     }
 * }
 *
 */
server.get('/page2', (req, res) => {

    if (!req.query.page || req.query.page < 1) {
        res.status(400).jsonp({
            msg: "잘못된 파라미터",
            code: -1000,
            data: null
        });
    } else {

        let start = 0;
        let end = 0;

        if(parseInt(req.query.page) === 1){
            start = 0;
            end = parseInt(req.query.limit);
        }else{
            start = (parseInt(req.query.page) - 1) * parseInt(req.query.limit);
            end = start + parseInt(req.query.limit);
        }

        console.log(`start:${start}, end:${end}, page:${req.query.page}, limit:${req.query.limit}`);

        const data = db.get('posts')
            .slice(start, end)
            .value()

        res.status(200).jsonp({
            msg: "조회가 성공했습니다.",
            code: 1000,
            data: {
                data: data,
                totalCnt: db.get('posts').size().value(),
                currentPage: req.query.page,
                pageSize: req.query.limit
            }
        });
    }

})


server.use(router)

server.listen(3004, () => {
    console.log('JSON Server is running')
})