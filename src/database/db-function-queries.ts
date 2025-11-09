export const DbFunction = {
  listing: {
    check_listing: `SELECT * FROM community_listing($1,$2,$3,$4,$5,$6,$7,$8,$9)`,
    check_listing_count: `SELECT * FROM community_listing_count($1,$2,$3,$4,$5,$6,$7,$8,$9)`,
  },
};
