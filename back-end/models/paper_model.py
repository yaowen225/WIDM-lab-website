from models.database import *
from json import dumps, loads


class Paper(db.Model, SchemaMixin):
    __tablename__ = 'paper'
    title = db.Column(db.Text)
    sub_title = db.Column(db.Text)
    description = db.Column(db.Text)
    authors = db.Column(db.Text)
    tags = db.Column(db.Text)
    publish_year = db.Column(db.String(30))
    origin = db.Column(db.String(255))
    detail_origin = db.Column(db.String(255))
    link = db.Column(db.String(255))
    types = db.Column(db.Text)
    attachment_path = db.Column(db.String(255))

    def to_dict(self):
        self.publish_year = self.publish_year
        self.authors = loads(self.authors)
        self.tags = loads(self.tags)
        self.types = loads(self.types)
        attachment_existed = True if self.attachment_path else False

        return {
            'id': self.id,
            'title': self.title,
            'sub_title': self.sub_title,
            'description': self.description,
            'authors': self.authors,
            'tags': self.tags,
            'publish_year': self.publish_year,
            'origin': self.origin,
            'detail_origin': self.detail_origin,
            'link': self.link,
            'types': self.types,
            'paper_existed': attachment_existed,
            'create_time': self.create_time,
            'update_time': self.update_time,

        }
