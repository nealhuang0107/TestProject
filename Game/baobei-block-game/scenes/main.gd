extends Node2D

const BOARD_WIDTH = 10
const BOARD_HEIGHT = 20
const CELL_SIZE = 32

var board = []  # 棋盤陣列：0 = 空, 1 = 佔用

@onready var tetromino_scene = preload("res://scenes/Tetromino.tscn")
var current_tetromino

func _ready():
	# 初始化棋盤
	board.resize(BOARD_HEIGHT)
	for y in range(BOARD_HEIGHT):
		board[y] = []
		board[y].resize(BOARD_WIDTH)
		for x in range(BOARD_WIDTH):
			board[y][x] = 0

	queue_redraw()
	spawn_tetromino()

func _draw():
	for y in range(BOARD_HEIGHT):
		for x in range(BOARD_WIDTH):
			var rect = Rect2(x * CELL_SIZE, y * CELL_SIZE, CELL_SIZE, CELL_SIZE)
			# 背景
			draw_rect(rect, Color(0.15, 0.15, 0.15))
			# 被佔用的格子
			if board[y][x] == 1:
				draw_rect(rect, Color(1, 1, 1))
			# 邊框
			draw_rect(rect, Color(0.4, 0.4, 0.4), false, 1.0)

# 生成新的方塊
func spawn_tetromino():
	current_tetromino = tetromino_scene.instantiate()
	add_child(current_tetromino)
	current_tetromino.start(self)

# 方塊落地固定
func lock_tetromino(tetro):
	var gx = int(tetro.grid_pos.x)
	var gy = int(tetro.grid_pos.y)

	for v in tetro.shape:
		var x = int(gx + v.x)
		var y = int(gy + v.y)
		if y >= 0 and y < BOARD_HEIGHT and x >= 0 and x < BOARD_WIDTH:
			board[y][x] = 1

	tetro.queue_free()

	clear_full_lines()
	queue_redraw()
	spawn_tetromino()

# 檢查某位置是否可放方塊
func is_valid_position(shape: Array, pos: Vector2) -> bool:
	for v in shape:
		var x = int(pos.x + v.x)
		var y = int(pos.y + v.y)
		if x < 0 or x >= BOARD_WIDTH:
			return false
		if y < 0 or y >= BOARD_HEIGHT:
			return false
		if board[y][x] == 1:
			return false
	return true

# 清除滿行
func clear_full_lines():
	var new_board = []
	var cleared_lines = 0

	# 從下往上檢查每一行
	for y in range(BOARD_HEIGHT - 1, -1, -1):
		var is_full = true
		for x in range(BOARD_WIDTH):
			if board[y][x] == 0:
				is_full = false
				break

		if not is_full:
			new_board.insert(0, board[y].duplicate())
		else:
			cleared_lines += 1

	# 新增空行在最上面
	for i in range(cleared_lines):
		var empty_row = []
		empty_row.resize(BOARD_WIDTH)
		for j in range(BOARD_WIDTH):
			empty_row[j] = 0
		new_board.insert(0, empty_row)

	# 確保長度正確
	while new_board.size() > BOARD_HEIGHT:
		new_board.remove_at(0)

	board = new_board
	print("Cleared lines:", cleared_lines)
