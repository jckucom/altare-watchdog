# altare-watchdog

Ty 的免费资源看门狗，跑在他的 Altare 免费机子上。

Altare 这台机子没有公开地址，外面访问不了，所以它只做对外检查：每 10 分钟访问一次下面这些地址，看看还活不活、顺便帮它们保活，结果打在应用日志里。

- Uppcoder 免费站：https://w1vx4kgw-hugo-main.apps-1.websson.cloud
- GitHub 恢复包 Gist：https://gist.github.com/jckucom/e18b16c7292c4235cbb386bcc257e68a
- Altare 控制台：https://console.altare.gg/apps

无密钥、无写入、无付费。`node app.js` 即跑，`/` 返回最近一次检查结果。
