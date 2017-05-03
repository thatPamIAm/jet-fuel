// knex seeds:run

exports.seed = function(knex, Promise) {
  return knex('urls').del()
  .then(() => knex('folders').del())
  .then(() => {
    return Promise.all([
      knex('folders').insert({
        title: "pam <3's nickelback"
      }, 'id')
      .then(folder => {
        console.log('folder', folder)

        return knex('urls').insert([
          {
            name: 'cool website',
            long_url: 'http://coolwebsite.com',
            folder_id: folder[0]
          },
          {
            name: 'another one',
            long_url: 'http://nickelbackforlife.com',
            folder_id: folder[0]
          }
        ])
      })
    ])
  })
}

