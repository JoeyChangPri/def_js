/*
 *Authur: Chang.Jian
 *Contact: changjian53@gmail.com
 *js实现分页
 *效果
 *===========================
 * 上一页 1 2 3 ... 15 16 17 ... 31 32 下一页
 *===========================
 */

function Paginator(total, page, per_page) {
	/*
	 * total: 项目总个数  int
	 * page: 表示第page页 int
	 * per_page: 每页显示项目个数 int
	 * callback 回调函数
	 */

	this.dot = '...';
	this.around = 1;         // 除开头结尾外 页数相隔超过1页 则用代替 如:page=6 则会显示 1 2 3 ... 5 6 7
	this.side = 3;           // 起始页和结尾页 显示页码个数  1 2 3 ... 11 12 13
	this._max = 10;          // 设置最少多少页才出现...

	this.total = total;
	page == undefined ? this.page = 1 : this.page = page;
	// per_page 默认值可以修改
	per_page == undefined ? this.per_page = 40 : this.per_page = per_page; 
	this.maxPage = 0 + Math.ceil(this.total/this.per_page);
	if (this.page > this.MaxPage) this.page = this.maxPage
	// 显示上一页 下一页
	this.hasNextPage = false;
	this.hasPrePage = false;
	if (this.maxPage != 1 ) {
		if (this.page > 1) this.hasPrePage = true;
		if (this.page < this.maxPage) this.hasNextPage = true;
	}
	this.range = [];
	this.set_range();
}


Paginator.prototype.set_range = function() {
	if (this.maxPage <= this._max) {                                                      
		for (var i=1; i<=this.maxPage; i++) {
			this.range.push(i);
		}
	} else {
		var head_dot = (this.page-this.around-1 > this.side);                       // 远离首页
		var tail_dot = (this.page+this.around < this.maxPage-this.side);            // 远离尾页

		if (head_dot && !tail_dot) {
			for(var i=1; i<=this.side; i++) {this.range.push(i);}
			this.range.push(this.dot);
			for(var i=(this.page-this.around); i<=this.maxPage; i++) {this.range.push(i);}
			return;
		}

		if (!head_dot && tail_dot) {
			for(var i=1; i<=this.side+this.around+1; i++) {
				if ((this.page<=this.side && i==this.side+1) || (this.page>this.side && i>this.page)) {
					break;
				}	
				this.range.push(i);
			}
			this.range.push(this.dot);
			for(var i=this.maxPage-this.side+1; i<=this.maxPage; i++) {this.range.push(i);}
			return;
		}

		if (head_dot && tail_dot) {
			for (var i=1; i<=this.side; i++) {this.range.push(i);}
			this.range.push(this.dot);
			this.range.push(this.page-1, this.page, this.page+1);
			this.range.push(this.dot);
			for(var i=this.maxPage-this.side+1; i<=this.maxPage; i++) {this.range.push(i);}
			return;
		}
		if (!head_dot && !tail_dot) {
			for (var i=1; i<=this.maxPage; i++) {
				this.range.push(i);
			}
		}
	}
}

Paginator.prototype.html = function(eid) {
	// 页面显示
	// console.log(this+'');
	document.getElementById(eid).innerHTML = this.display(eid);
}

Paginator.prototype.display = function(pid) {
	var show = '';
	if (this.hasPrePage)
	{
		show += '<a href="javascript:void(0)" target="_self" onClick="(new Paginator(' + 
				this.total + ',' + (this.page-1) + ',' + this.per_page + 
				')).html(\'' + pid + '\')">上一页</a>';
	}

	for (var i in this.range) {
		if (this.range[i] == this.page || this.range[i] == this.dot) {
			show += '<span>' + this.range[i] + '</span>';

		} else {
			show += '<a href="javascript:void(0)" target="_self" onClick="(new Paginator(' + 
					this.total + ', ' + this.range[i] + ', ' + this.per_page + ')).html(\'' + pid + '\')">' + 
  					this.range[i] + '</a>';
		}
	}

	if (this.hasNextPage)
	{
		show += '<a href="javascript:void(0)" target="_self" onClick="(new Paginator(' + 
				this.total + ', ' + (this.page+1) + ', ' + this.per_page + 
				')).html(\'' + pid + '\')">下一页</a>';
	}
	return show;
}
