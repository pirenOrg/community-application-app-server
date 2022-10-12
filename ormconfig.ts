({
    type: "mysql",
    host: '127.0.0.1',
    port: 3306,
    username: 'root',
    password: '!#@#123qwe',
    database: 'project1',
    entities: ['src/**/*.entity'], // 사용할 entity의 클래스명을 넣어둔다.
    synchronize: false, // false로 해두는 게 안전하다.
});