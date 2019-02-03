"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const port = 3001;
const app = express();
app.use(express.static('/home/alex/dev/test/e2e/render-and-test/example/public'));
const html = '<h1>ABC</h1>';
app.get('/abc', (req, res) => res.send(html));
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
//# sourceMappingURL=test.js.map