Backbone.Model.prototype.idAttribute = '_id';

// Backbone Model

var info = Backbone.Model.extend({
	defaults: {
		Timestamp: '',
		Destination_ip: '',
		Destination_vn:'',
		Direction:'',
		Destination_port:'',
		protocol:'',
		source_ip:'',
		source_vn:'',
		source_port:'',
		sum_bytes:'',
		sum_packets:''
	}
});

// Backbone Collection

var infos = Backbone.Collection.extend({
	url: 'http://localhost:3000/api/infos'
});



// instantiate a Collection

var infos = new info();

// Backbone View for one info

var infoView = Backbone.View.extend({
	model: new info(),
	tagName: 'tr',
	initialize: function() {
		this.template = _.template($('.infos-list-template').html());
	},
	events: {
		'click .edit-info': 'edit',
		'click .update-info': 'update',
		'click .cancel': 'cancel',
		'click .delete-info': 'delete'
	},
	edit: function() {
		$('.edit-info').hide();
		$('.delete-info').hide();
		this.$('.update-info').show();
		this.$('.cancel').show();

		var timestamp = this.$('.timestamp').html();
		var Destination_ip = this.$('.Destination_ip').html();
		var Destination_vn = this.$('.Destination_vn').html();
		var Direction = this.$('.Direction').html();
		var Destination_port= this.$('.Direction').html();
		var protocol= this.$('.protocol').html();
		var source_ip= this.$('.source_ip').html();
		var source_vn= this.$('.source_vn').html();
		var source_port= this.$('.source_port').html();
		var sum_bytes= this.$('.sum_bytes').html();
		var sum_packets= this.$('.sum_packets').html();

		this.$('.timestamp').html('<input type="text" class="form-control timestamp-update" value="' + timestamp + '">');
		this.$('.Destination_ip').html('<input type="text" class="form-control Destination_ip-update" value="' + Destination_ip + '">');
		this.$('.Destination_vn').html('<input type="text" class="form-control Destination_vn-update" value="' + Destination_vn + '">');
		this.$('.Direction').html('<input type="text" class="form-control Direction-update" value="' + Direction + '">');
		this.$('.Destination_port').html('<input type="text" class="form-control Destination_port-update" value="' + Destination_port + '">');
		this.$('.protocol').html('<input type="text" class="form-control protocol-update" value="' + protocol + '">');
		this.$('.source_ip').html('<input type="text" class="form-control source_ip-update" value="' + source_ip+ '">');
		this.$('.source_vn').html('<input type="text" class="form-control source_vn-update" value="' + source_vn + '">');
		this.$('.source_port').html('<input type="text" class="form-control source_port-update" value="' + source_port + '">');
		this.$('.sum_bytes').html('<input type="text" class="form-control sum_bytes-update" value="' + sum_bytes + '">');
		this.$('.sum_packets').html('<input type="text" class="form-control sum_packets-update" value="' + sum_packets + '">');
	
	},
	update: function() {
		this.model.set('timestamp', $('.timestamp-update').val());
		this.model.set('Destination_ip', $('.Destination_ip-update').val());
		this.model.set('Directon', $('.Direction-update').val());
		this.model.set('Destination_port', $('.Destination_port-update').val());
		this.model.set('protocol', $('.protocol-update').val());
		this.model.set('source_ip', $('.source_ip-update').val());
		this.model.set('source_vn', $('.dource_vn-update').val());
		this.model.set('source_port', $('.source_port-update').val());
		this.model.set('sum_bytes', $('.sum_bytes-update').val());
		this.model.set('Destination_vn', $('.Destination_vn-update').val());
		this.model.set('sum_packets', $('.sum_packets-update').val());
		

		this.model.save(null, {
			success: function(response) {
				console.log('Successfully UPDATED info with _id: ' + response.toJSON()._id);
			},
			error: function(err) {
				console.log('Failed to update info!');
			}
		});
	},
	cancel: function() {
		infosView.render();
	},
	delete: function() {
		this.model.destroy({
			success: function(response) {
				console.log('Successfully DELETED info with _id: ' + response.toJSON()._id);
 			},
			error: function(err) {
				console.log('Failed to delete info!');
			}
		});
	},
	render: function() {
		this.$el.html(this.template(this.model.toJSON()));
		return this;
	}
});

// Backbone View for all infos

var infosView = Backbone.View.extend({
	model: infos,
	el: $('.infos-list'),
	initialize: function() {
		var self = this;
		this.model.on('add', this.render, this);
		this.model.on('change', function() {
			setTimeout(function() {
				self.render();
			}, 30);
		},this);
		this.model.on('remove', this.render, this);

		this.model.fetch({
			success: function(response) {
				_.each(response.toJSON(), function(item) {
					console.log('Successfully GOT info with _id: ' + item._id);
				})
			},
			error: function() {
				console.log('Failed to get infos!');
			}
		});
	},
	render: function() {
		var self = this;
		this.$el.html('');
		_.each(this.model.toArray(), function(info) {
			self.$el.append((new infoView({model: info})).render().$el);
		});
		return this;
	}
});

$(document).ready(function() {
	$('.add-info').on('click', function() {
		var info = new info({
			timestamp: $('.timestamp-input').val(),
			Destination_ip: $('.Destination_ip-input').val(),
			Destination_vn:  $(.'Destination_vn-input'),
			Direction:$(.'Direction-input'),
		Destination_port:$(.'Destination_port-input'),
		protocol:$(.'protocol-input'),
		source_ip:$(.'source_ip-input'),
		source_vn:$(.'source_vn-input'),
		source_port:$(.'source_port-input'),
		sum_bytes:$(.'sum_bytes-input'),
		sum_packets:$(.'sum_packets-input')
		});
		
		infos.add(info);
		info.save(null, {
			success: function(response) {
				console.log('Successfully SAVED info with _id: ' + response.toJSON()._id);
			},
			error: function() {
				console.log('Failed to save info!');
			}
		});
	});
})
