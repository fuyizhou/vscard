
function exc2json(fname) {
    console.log('导出服务器表');
    //
    var fs = require("fs");
    if(!fs) {
        return ;
    }
    //
    var xl = require("xlsx");
    if(!xl) {
        return ;
    }

    var hworkbook = xl.readFile(fname);
    
    const sheetNames = hworkbook.SheetNames;

    console.log(sheetNames);

    for(let i = 0;i<sheetNames.length;i++) {
        let t_sheetname = sheetNames[i];
        var t_sheet = hworkbook.Sheets[t_sheetname];
        if(t_sheet) {
            //获取第一行抬头
            var data =xl.utils.sheet_to_json(t_sheet);
            //
            var t_jsonl_str = "";
            for(let j in data) {
                //console.log(data[j]);
                let tmpstr = JSON.stringify(data[j]);
                t_jsonl_str += tmpstr;
                t_jsonl_str += "\n";
            }
            console.log(t_jsonl_str);
            //console.log(t_json);
            //写入文件
            var t_jsonl_name = t_sheetname + '_db_l.json';
            fs.writeFile(t_jsonl_name,t_jsonl_str,function(err){
            if (err) {
                res.status(500).send('Server is error...');
            }});
        }
    }
//end    
}

exc2json('./vstbl.xlsx');
exc2json('./vslevel.xlsx');
exc2json('./vseg.xlsx');
exc2json('./vspipei.xlsx');
exc2json('./vsai.xlsx');
exc2json('./vsaicardgroup.xlsx');

