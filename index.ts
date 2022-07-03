import createError from 'http-errors';
import express, { Request, Response, NextFunction } from 'express';
import path from 'path';
import routers from './src/routes/index';
import session from './src/authentication/session';
import { runInNewContext } from 'vm';

const app = express();
const port = 3000;

// session 적용 
app.use(session);

// view engine setup
app.set('views', path.join(__dirname, './src/views'));
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, './src/public')));

app.use(express.json());    // 해당 미들웨어를 설정해줘야 json으로 넘어오는 데이터를 캐치할 수 있다.

// router import
app.use(routers);

// catch 404 and forward to error handler
app.use(function (req: Request, res: Response, next: NextFunction) {
    next(createError(404));
});

// error handler
app.use(function (err:Error , req: Request, res: Response, next: NextFunction) {
    res.render('error', {error:err});
});

app.listen(port, () => {
    console.log(`port : ${port}`);
});
 
export = app;
