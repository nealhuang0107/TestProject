# res://scenes/Main.gd
extends Node2D

const BOARD_COLS := 10
const BOARD_ROWS := 20
const CELL_SIZE := 32

@onready var board_node = get_node_or_null("Board")
@onready var score_label = get_node_or_null("CanvasLayer/ScoreLabel")
@onready var game_over_label = get_node_or_null("CanvasLayer/GameOverLabel")
@onready var restart_button = get_node_or_null("CanvasLayer/RestartButton")

var board = []
var score := 0
var current_tetro = null
var tetro_scene := preload("res://scenes/Tetromino.tscn")

func _ready():
	_init_board()
	_reset_game()
	restart_button.pressed.connect(_on_restart_pressed)

func _init_board():
	board.resize(BOARD_ROWS)
	for r in range(BOARD_ROWS):
		board[r] = []
		board[r].resize(BOARD_COLS)
		for c in range(BOARD_COLS):
			board[r][c] = null

func _reset_game():
	for child in board_node.get_children():
		child.queue_free()
	_init_board()
	score = 0
	_update_score()
	game_over_label.visible = false
	restart_button.visible = false
	_spawn_tetromino()

func _spawn_tetromino():
	var t = tetro_scene.instantiate()
	board_node.add_child(t)
	var start_pos = Vector2(4, 0)
	var shapes = [
		[Vector2(0,0), Vector2(1,0), Vector2(0,1), Vector2(1,1)],  # 方形
		[Vector2(0,0), Vector2(1,0), Vector2(2,0), Vector2(3,0)],  # 長條
		[Vector2(0,0), Vector2(1,0), Vector2(1,1), Vector2(2,1)],  # Z形
		[Vector2(1,0), Vector2(0,1), Vector2(1,1), Vector2(2,1)],  # T形
	]
	var shape = shapes[randi() % shapes.size()]
	t.start(shape, start_pos, self)
	current_tetro = t

func lock_tetromino(tetro: Node2D, cells: Array):
	for rel in cells:
		var col = int(tetro.board_pos.x + rel.x)
		var row = int(tetro.board_pos.y + rel.y)
		if row < 0:
			_game_over()
			return
		board[row][col] = tetro
	_check_lines()
	tetro.queue_free()
	_spawn_tetromino()

func _check_lines():
	var lines_cleared := 0
	for row in range(BOARD_ROWS - 1, -1, -1):
		if not board[row].has(null):
			lines_cleared += 1
			_clear_line(row)
	# 下移方塊
	if lines_cleared > 0:
		_collapse_lines()
		score += lines_cleared * 50
		_update_score()

func _clear_line(row_idx):
	for c in range(BOARD_COLS):
		if board[row_idx][c]:
			board[row_idx][c].queue_free()
	board.remove_at(row_idx)
	var new_row = []
	new_row.resize(BOARD_COLS)
	for i in range(BOARD_COLS):
		new_row[i] = null
	board.insert(0, new_row)

func _collapse_lines():
	for r in range(BOARD_ROWS - 1, -1, -1):
		for c in range(BOARD_COLS):
			var cell = board[r][c]
			if cell:
				cell.position.y = r * CELL_SIZE + CELL_SIZE * 0.5

func _update_score():
	score_label.text = "SCORE: %d" % score

func _game_over():
	game_over_label.visible = true
	restart_button.visible = true
	if current_tetro:
		current_tetro.queue_free()
	current_tetro = null

func _on_restart_pressed():
	_reset_game()
