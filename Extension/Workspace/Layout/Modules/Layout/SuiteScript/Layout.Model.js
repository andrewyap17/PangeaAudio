
// Example of basic CRUD operations of JHM.Layout.Layout

define('JHM.Layout.Layout.Model'
,	[
		'SC.Model'
	,	'SC.Models.Init'

	,	'underscore'
	]
,	function (
		SCModel
	,	ModelsInit

	,	_
	)
{
	'use strict';

	return SCModel.extend({
		
		name: 'JHM.Layout.Layout'

	,	validation: {
			title: {required: true, msg: 'Title is required'}
		}

	,	get: function (id)
		{
			var list = nlapiGetContext().getSessionObject('layout_list');
			list = list !== null && list !== '' ? JSON.parse(list) : [];
			return list;
		}

	,	update: function (data)
		{
			var list = nlapiGetContext().getSessionObject('layout_list');
			list = list !== null && list !== '' ? JSON.parse(list) : [];

			if(data.internalid)
			{
				var task = _.findWhere(list, {internalid: data.internalid});
				task.title = data.title;
				task.completed = data.completed;
				
				nlapiGetContext().setSessionObject('layout_list', JSON.stringify(list));
				return task;
			}
			else
			{
				throw new Error('Invalid TODO id ' + data.internalid);
			}
		}

	,	create: function (data)
		{
			var list = nlapiGetContext().getSessionObject('layout_list');
			list = list !== null && list !== '' ? JSON.parse(list) : [];
			var task = {
				internalid: list.length + 1
			,	title: data.title
			,	completed: false
			};

			list.push(task);

			nlapiGetContext().setSessionObject('layout_list', JSON.stringify(list));
          	return task;
		}

	,	remove: function (id)
		{
			var list = nlapiGetContext().getSessionObject('layout_list');
			list = list !== null && list !== '' ? JSON.parse(list) : [];

			if(id)
			{
            	var task = _.findWhere(list, {internalid: parseInt(id, 10)});
				var index = _.indexOf(list, task);
				if(task && index >= 0)
				{
					list.splice(index, 1);
					nlapiGetContext().setSessionObject('layout_list', JSON.stringify(list));
					return {'status': 'ok'};
				}
				else
				{
					throw new Error('Could not find TODO with id ' + id);
				}
			}
			else
			{
				throw new Error('Invalid TODO id ' + id);
			}
		}
	});
});