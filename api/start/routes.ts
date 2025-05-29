import router from '@adonisjs/core/services/router'
import { middleware } from '#start/kernel'

router.resource('session', '#controllers/session_controller')
router.resource('user', '#controllers/user_controller').use('*', middleware.auth())
router.resource('productor', '#controllers/productor_controller').use('*', middleware.auth())
router.resource('info-state', '#controllers/info_state_controller').use('*', middleware.auth())
router.resource('farm', '#controllers/farm_controller').use('*', middleware.auth())
