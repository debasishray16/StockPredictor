from waitress import serve
import backend_API
serve(backend_API.app, host='0.0.0.0', port=5000)