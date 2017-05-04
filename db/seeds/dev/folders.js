// knex seed:run

exports.seed = function(knex, Promise) {
  return knex('urls').del()
  .then(() => knex('folders').del())
  .then(() => {
    return Promise.all([
      knex('folders').insert({
        folder_name: "pam <3's nickelback"
      }, 'id')
      .then(folder => {
        console.log('folder', folder)

        return knex('urls').insert([
          {
            url_name: 'cool website',
            long_url: 'http://coolwebsite.com',
            folder_id: folder[0],
            visit_count: 2
          },
          {
            url_name: 'another one',
            long_url: 'http://nickelbackforlife.com',
            folder_id: folder[0],
            visit_count: 1
          }
        ])
      })
    ])
  })
}

