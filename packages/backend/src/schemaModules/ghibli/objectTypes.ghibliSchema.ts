import { objectType } from 'nexus';

export const HelloWorld = objectType({
  name: 'HelloWorld',
  definition(t) {
    t.string('message');
  },
});

export const Film = objectType({
  name: 'Film',
  definition(t) {
    t.nonNull.string('id');
    t.nonNull.string('title');
    t.string('original_title');
    t.string('original_title_romanised');
    t.string('image');
    t.string('movie_banner');
    t.nonNull.string('description');
    t.nonNull.string('director');
    t.string('producer');
    t.nonNull.string('release_date');
    t.nonNull.string('running_time');
    t.nonNull.string('rt_score');
    t.list.string('people');
    t.list.string('species');
    t.list.string('locations');
    t.list.string('vehicles');
    t.nonNull.string('url');
  },
});
