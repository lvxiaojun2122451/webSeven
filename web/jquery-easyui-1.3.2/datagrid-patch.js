(function ($) {
    $.extend($.fn.datagrid.defaults.view, {
        insertRow: function (target, index, row) {
            var state = $.data(target, 'datagrid');
            var opts = state.options;
            var dc = state.dc;
            var data = state.data;

            if (index == undefined || index == null) index = data.rows.length;
            if (index > data.rows.length) index = data.rows.length;

            for (var i = data.rows.length - 1; i >= index; i--) {
                var tr2 = opts.finder.getTr(target, i, 'body', 2);
                tr2.attr('datagrid-row-index', i + 1);
                tr2.attr('id', state.rowIdPrefix + '-2-' + (i + 1));
                var tr1 = opts.finder.getTr(target, i, 'body', 1);
                tr1.attr('datagrid-row-index', i + 1);
                tr1.attr('id', state.rowIdPrefix + '-1-' + (i + 1));
                if (opts.rownumbers) {
                    tr1.find('div.datagrid-cell-rownumber').html(i + 2);
                }
            }

            var fields1 = $(target).datagrid('getColumnFields', true);
            var fields2 = $(target).datagrid('getColumnFields', false);
            var rowId1 = state.rowIdPrefix + '-1-' + index;
            var rowId2 = state.rowIdPrefix + '-2-' + index;
            var tr1 = '<tr id="' + rowId1 + '" class="datagrid-row" datagrid-row-index="' + index + '">' + this.renderRow.call(this, target, fields1, true, index, row) + '</tr>';
            var tr2 = '<tr id="' + rowId2 + '" class="datagrid-row" datagrid-row-index="' + index + '">' + this.renderRow.call(this, target, fields2, false, index, row) + '</tr>';
            if (index >= data.rows.length) {
                // append new row
                if (data.rows.length) {
                    // not empty
                    opts.finder.getTr(target, '', 'last', 1).after(tr1);
                    opts.finder.getTr(target, '', 'last', 2).after(tr2);
                } else {
                    dc.body1.html('<table cellspacing="0" cellpadding="0" border="0"><tbody>' + tr1 + '</tbody></table>');
                    dc.body2.html('<table cellspacing="0" cellpadding="0" border="0"><tbody>' + tr2 + '</tbody></table>');
                }
            } else {  // insert new row
                opts.finder.getTr(target, index + 1, 'body', 1).before(tr1);
                opts.finder.getTr(target, index + 1, 'body', 2).before(tr2);
            }

            data.total += 1;
            data.rows.splice(index, 0, row);

            this.refreshRow.call(this, target, index);
        },

        deleteRow: function (target, index) {
            var state = $.data(target, 'datagrid');
            var opts = state.options;
            var data = state.data;

            opts.finder.getTr(target, index).remove();
            for (var i = index + 1; i < data.rows.length; i++) {
                var tr2 = opts.finder.getTr(target, i, 'body', 2);
                tr2.attr('datagrid-row-index', i - 1);
                tr2.attr('id', state.rowIdPrefix + '-2-' + (i - 1));
                var tr1 = opts.finder.getTr(target, i, 'body', 1);
                tr1.attr('id', state.rowIdPrefix + '-1-' + (i - 1));
                tr1.attr('datagrid-row-index', i - 1);
                if (opts.rownumbers) {
                    tr1.find('div.datagrid-cell-rownumber').html(i);
                }
            }

            data.total -= 1;
            data.rows.splice(index, 1);
        }
    });
})(jQuery);