const router = express.Router();

router.get('/root', async function(req, res) {
    const content = await ejs.renderFile(require('path').join(__dirname, '..', 'insights', 'root.ejs'));
    res.send({
        content: content.substring(0, parseInt(req.query.count)),
        isDone: req.query.count >= content.length
    })
});

module.exports = router;
