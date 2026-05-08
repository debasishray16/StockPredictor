from waitress import serve
import model_api as model_api
serve(model_api.app, host='0.0.0.0', port=5000)