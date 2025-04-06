from pathlib import Path
import uuid

from blurprints.member_blueprint import member_blueprint
from blurprints.image_blueprint import image_blueprint
from blurprints.activity_blueprint import activity_blueprint
from blurprints.paper_blueprint import paper_blueprint
from blurprints.project_blueprint import project_blueprint
from blurprints.retrieval_blueprint import retrieval_blueprint
from blurprints.news_blueprint import news_blueprint
from blurprints.auth_blueprint import auth_blueprint

from config import Config
from models.database import db

from flask import Flask, session, render_template
from flasgger import Swagger
from flask_cors import CORS
from flask_jwt_extended import JWTManager

import requests

def create_app():
    app = Flask(__name__)
    app.secret_key = uuid.uuid4().hex
    app.config.from_object(Config)
    db.init_app(app)

    from blurprints.retrieval_blueprint import scrapying

    # 創建一個狀態標記
    class AppState:
        initialized = False

    app.state = AppState()

    @app.after_request
    def after_request(response):
        if not app.state.initialized:
            with app.app_context():
                try:
                    scrapying()
                    app.state.initialized = True
                    app.logger.info("Retrieval initialization completed")
                except Exception as e:
                    app.logger.error(f"Error initializing retrieval: {str(e)}")
        return response
    
    with app.app_context():
        db.create_all()
        db.session.commit()

    app.register_blueprint(member_blueprint, url_prefix='/api/member')
    app.register_blueprint(image_blueprint, url_prefix='/api/image')
    app.register_blueprint(activity_blueprint, url_prefix='/api/activity')
    app.register_blueprint(paper_blueprint, url_prefix='/api/paper')
    app.register_blueprint(project_blueprint, url_prefix='/api/project')
    app.register_blueprint(retrieval_blueprint, url_prefix='/api/retrieval')
    app.register_blueprint(news_blueprint, url_prefix='/api/news')
    app.register_blueprint(auth_blueprint, url_prefix='/api/auth')

    Swagger(app)
    CORS(
        app,
        resources={
            r"/*": {
                "origins": "*", "allow_headers": "*", "expose_headers": "*"
            }
        }, supports_credentials=True
    )
    JWTManager(app)

    return app


app = create_app()

if __name__ == '__main__':
    Path('statics/images').mkdir(parents=True, exist_ok=True)
    Path('statics/attachments').mkdir(parents=True, exist_ok=True)
    Path('statics/chroma_db').mkdir(parents=True, exist_ok=True)
    Path('statics/retrieve').mkdir(parents=True, exist_ok=True)
    app.run(host=app.config['HOST'], port=app.config['PORT'])
