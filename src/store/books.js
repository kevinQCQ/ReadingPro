// store/books.js
import { defineStore } from 'pinia';

export const useBooksStore = defineStore('books', {
    state: () => ({
        books: [],
    }),
    actions: {
        setBooks(books) {
            // console.log('setBooks', books);
            this.books = books;
        },
        fetchBooks() {
            // 模拟从 API 获取书籍数据
            const books = [
                { id: 1, title: '毛泽东选集', cover: 'https://s3proxy.cdn-zlib.sk/covers300/collections/genesis/25728e84dca6ab1a24fd76ac46fc6bdb759cdfc3fecd00053e5c3a72e64fcdfc.jpg' },
                { id: 2, title: '被讨厌的勇气', cover: 'https://s3proxy.cdn-zlib.sk/covers300/collections/userbooks/09d56417a36781520aed51632632175c49537f6b2127184c3dcf677734331aff.jpg' },
                { id: 3, title: '长安的荔枝', cover: 'https://s3proxy.cdn-zlib.sk/covers300/collections/userbooks/922b815666cfeed996ffa5a8dcf1da7bfb1700e04f91a65104796a0bea769552.jpg' },
                { id: 4, title: '素食者', cover: 'https://s3proxy.cdn-zlib.sk/covers300/collections/userbooks/fbdb7e6bdba84c423d8b3fb2d47976a38333069b5938ff4dd2e336730185fcda.jpg' },
                { id: 5, title: '你当像鸟飞往你的山', cover: 'https://s3proxy.cdn-zlib.sk/covers300/collections/genesis/d298aa327f2a87873719d0bb6c1561f634ca291aa7b608c349d2419b18041f37.jpg' },
                { id: 6, title: '我与地坛', cover: 'https://s3proxy.cdn-zlib.sk/covers300/collections/userbooks/13f04140430b0218a3bb1b08f8104c6dc6cb56d17e096c31df767442cac1ec84.jpg' },
                { id: 7, title: '蛤蟆先生', cover: 'https://s3proxy.cdn-zlib.sk/covers300/collections/userbooks/21a8643bade484df2e3f01d00da862cad3c757deff0be5c9c7951631ca83ebae.jpg' },
                { id: 8, title: '悉达多', cover: 'https://s3proxy.cdn-zlib.sk/covers300/collections/userbooks/d25e38231bc5386abfc9971bd4c67ea4b1c8fd911ae12fc118e0ce73e3fba131.jpg' },
                { id: 9, title: '认知', cover: 'https://s3proxy.cdn-zlib.sk/covers300/collections/userbooks/ce4dbe481fe4465199ffa23628e97cc3d72b7866a59f3eaa1e764e07964b0de3.jpg' },
                { id: 10, title: '我胆小如鼠', cover: 'https://s3proxy.cdn-zlib.sk/covers300/collections/userbooks/a2265bd59553d3748776805eac4b413e1c4bf73e3dcfffe6ce11123f896727e9.jpg' },
                { id: 11, title: '毛泽东选集', cover: 'https://s3proxy.cdn-zlib.sk/covers300/collections/genesis/25728e84dca6ab1a24fd76ac46fc6bdb759cdfc3fecd00053e5c3a72e64fcdfc.jpg' },
                { id: 12, title: '被讨厌的勇气', cover: 'https://s3proxy.cdn-zlib.sk/covers300/collections/userbooks/09d56417a36781520aed51632632175c49537f6b2127184c3dcf677734331aff.jpg' },
                { id: 13, title: '长安的荔枝', cover: 'https://s3proxy.cdn-zlib.sk/covers300/collections/userbooks/922b815666cfeed996ffa5a8dcf1da7bfb1700e04f91a65104796a0bea769552.jpg' },
                { id: 14, title: '素食者', cover: 'https://s3proxy.cdn-zlib.sk/covers300/collections/userbooks/fbdb7e6bdba84c423d8b3fb2d47976a38333069b5938ff4dd2e336730185fcda.jpg' },
                { id: 15, title: '你当像鸟飞往你的山', cover: 'https://s3proxy.cdn-zlib.sk/covers300/collections/genesis/d298aa327f2a87873719d0bb6c1561f634ca291aa7b608c349d2419b18041f37.jpg' },
                { id: 16, title: '我与地坛', cover: 'https://s3proxy.cdn-zlib.sk/covers300/collections/userbooks/13f04140430b0218a3bb1b08f8104c6dc6cb56d17e096c31df767442cac1ec84.jpg' },
                { id: 17, title: '蛤蟆先生', cover: 'https://s3proxy.cdn-zlib.sk/covers300/collections/userbooks/21a8643bade484df2e3f01d00da862cad3c757deff0be5c9c7951631ca83ebae.jpg' },
                { id: 18, title: '悉达多', cover: 'https://s3proxy.cdn-zlib.sk/covers300/collections/userbooks/d25e38231bc5386abfc9971bd4c67ea4b1c8fd911ae12fc118e0ce73e3fba131.jpg' },
                { id: 19, title: '认知', cover: 'https://s3proxy.cdn-zlib.sk/covers300/collections/userbooks/ce4dbe481fe4465199ffa23628e97cc3d72b7866a59f3eaa1e764e07964b0de3.jpg' },
                { id: 20, title: '我胆小如鼠', cover: 'https://s3proxy.cdn-zlib.sk/covers300/collections/userbooks/a2265bd59553d3748776805eac4b413e1c4bf73e3dcfffe6ce11123f896727e9.jpg' },
                { id: 21, title: '毛泽东选集', cover: 'https://s3proxy.cdn-zlib.sk/covers300/collections/genesis/25728e84dca6ab1a24fd76ac46fc6bdb759cdfc3fecd00053e5c3a72e64fcdfc.jpg' },
                { id: 22, title: '被讨厌的勇气', cover: 'https://s3proxy.cdn-zlib.sk/covers300/collections/userbooks/09d56417a36781520aed51632632175c49537f6b2127184c3dcf677734331aff.jpg' },
                { id: 23, title: '长安的荔枝', cover: 'https://s3proxy.cdn-zlib.sk/covers300/collections/userbooks/922b815666cfeed996ffa5a8dcf1da7bfb1700e04f91a65104796a0bea769552.jpg' },
                { id: 24, title: '素食者', cover: 'https://s3proxy.cdn-zlib.sk/covers300/collections/userbooks/fbdb7e6bdba84c423d8b3fb2d47976a38333069b5938ff4dd2e336730185fcda.jpg' },
                { id: 25, title: '你当像鸟飞往你的山', cover: 'https://s3proxy.cdn-zlib.sk/covers300/collections/genesis/d298aa327f2a87873719d0bb6c1561f634ca291aa7b608c349d2419b18041f37.jpg' },
                { id: 26, title: '我与地坛', cover: 'https://s3proxy.cdn-zlib.sk/covers300/collections/userbooks/13f04140430b0218a3bb1b08f8104c6dc6cb56d17e096c31df767442cac1ec84.jpg' },
                { id: 27, title: '蛤蟆先生', cover: 'https://s3proxy.cdn-zlib.sk/covers300/collections/userbooks/21a8643bade484df2e3f01d00da862cad3c757deff0be5c9c7951631ca83ebae.jpg' },
                { id: 28, title: '悉达多', cover: 'https://s3proxy.cdn-zlib.sk/covers300/collections/userbooks/d25e38231bc5386abfc9971bd4c67ea4b1c8fd911ae12fc118e0ce73e3fba131.jpg' },
                { id: 29, title: '认知', cover: 'https://s3proxy.cdn-zlib.sk/covers300/collections/userbooks/ce4dbe481fe4465199ffa23628e97cc3d72b7866a59f3eaa1e764e07964b0de3.jpg' },
                { id: 30, title: '我胆小如鼠', cover: 'https://s3proxy.cdn-zlib.sk/covers300/collections/userbooks/a2265bd59553d3748776805eac4b413e1c4bf73e3dcfffe6ce11123f896727e9.jpg' },
            ];
            this.setBooks(books);
        },
    },
});