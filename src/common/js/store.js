/*
* @Author: liutengfei
* @Date:   2017-04-11 14:30:25
* @Last Modified by:   liutengfei
* @Last Modified time: 2017-04-11 14:32:08
*/

export function saveToLocal(id, key, value) {
    let seller = window.localStorage._seller_;
    if(!seller){
        seller = {};
        seller[id] = {};
    }else{
        seller = JSON.parse(seller);
        if(!seller[id]){
            seller[id] = {};
        }
    }
    seller[id][key] = value;
    window.localStorage._seller_ = JSON.stringify(seller);
};

export function loadFromLocal(id, key, def) {
    let seller = window.localStorage._seller_;
    if(!seller){
        return def;
    }
    seller = JSON.parse(seller)[id];
    if(!seller){
        return def;
    }
    let ret = seller[key];
    return ret || def;
};