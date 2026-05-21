const fs = require('fs');

const oldJLPT4 = `一 二 三 四 五 六 七 八 九 十 百 千 万 円 日 月 火 水 木 金 土 山 川 田 天 雨 空 気 人 男 女 子 父 母 友 目 口 耳 手 足 上 下 中 外 前 後 右 左 東 西 南 北 年 今 週 時 分 半 午 朝 昼 夜 間 毎 大 小 高 長 多 少 新 古 白 名 国 見 行 来 食 飲 買 休 出 入 立 生 読 書 言 話 語 聞 車 電 本 学 校 先 何`;
let kanjis = oldJLPT4.replace(/\s+/g, '').split('');
console.log("N5 Kanji size:", kanjis.length);
console.log(kanjis.join(''));
