# 香云纱网站

## 本地预览
```bash
cd "/Users/kdsgg/Documents/香云纱"
python3 -m http.server 8080
```
访问：`http://localhost:8080/index.html`

## GitHub Pages 发布
1. 在 GitHub 新建一个仓库（例如 `xiangyunsha-site`）。
2. 在本地仓库执行：
```bash
git add .
git commit -m "feat: build xiangyunsha site"
git remote add origin <你的仓库URL>
git push -u origin main
```
3. 打开 GitHub 仓库 `Settings -> Pages`：
   - `Build and deployment` 选择 `Source: GitHub Actions`。
4. 等待 Actions 跑完后，访问：
   - `https://<你的GitHub用户名>.github.io/<仓库名>/`

## 页面结构
- `index.html`：首页
- `intro.html`：介绍（起源/工艺/传承）
- `shop.html`：商店入口
- `ready-to-wear.html`：成衣列表
- `private-custom.html`：私人定制（5 种等级面料）
- `custom-designs.html`：当前等级可定制设计
- `about.html`：关于我们
- `suggest.html`：建议提交（图片 <= 15MB）
