var helper = require(__dirname + '/test-helper');
//http://www.postgresql.org/docs/8.3/static/libpq-notify.html
test('recieves notification from same connection with no payload', function() {
  helper.connect(function(con) {
    con.query('LISTEN boom');
    assert.raises(con, 'readyForQuery', function() {
      con.query("NOTIFY boom");
      assert.raises(con, 'notificationResponse', function(msg) {
        assert.equal(msg.payload, "");
        assert.equal(msg.channel, 'boom')
        con.end();
      });
    });
  });
});