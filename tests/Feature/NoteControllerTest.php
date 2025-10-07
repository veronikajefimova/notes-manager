<?php

namespace Tests\Feature;

use App\Models\User;
use App\Models\Note;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class NoteControllerTest extends TestCase
{
    use RefreshDatabase; // очищает базу перед каждым тестом

    public function test_notes_page_loads_for_authenticated_user()
    {
        // Создаём тестового пользователя
        $user = User::factory()->create();

        // Авторизуем пользователя
        $response = $this->actingAs($user)->get('/notes');

        // Проверяем, что страница открывается
        $response->assertStatus(200);
    }

    public function test_user_can_create_a_note()
    {
        $user = User::factory()->create();

        $noteData = [
            'title' => 'My Test Note',
            'description' => 'This is a test note.',
        ];

        $response = $this->actingAs($user)->post('/notes', $noteData);

        // Проверяем, что редирект сработал
        $response->assertStatus(302);

        // Проверяем, что заметка есть в базе
        $this->assertDatabaseHas('notes', [
            'title' => 'My Test Note',
            'description' => 'This is a test note.',
        ]);
    }

    public function test_user_can_see_created_note()
    {
        $user = User::factory()->create();
        $note = Note::factory()->create(); // без user_id

        $response = $this->actingAs($user)->get('/notes');

        $response->assertSee($note->title);
    }

    public function test_user_can_update_a_note()
    {
        $user = User::factory()->create();
        $note = Note::factory()->create([
            'title' => 'Old Title',
            'description' => 'Old description',
        ]);

        $updatedData = [
            'title' => 'Updated Title',
            'description' => 'Updated description',
        ];

        $response = $this->actingAs($user)->put("/notes/{$note->id}", $updatedData);
        $response->assertStatus(302);

        $this->assertDatabaseHas('notes', $updatedData);
    }

    public function test_user_can_delete_a_note()
    {
        $user = User::factory()->create();
        $note = Note::factory()->create();

        $response = $this->actingAs($user)->delete("/notes/{$note->id}");
        $response->assertStatus(302);

        $this->assertDatabaseMissing('notes', [
            'id' => $note->id,
        ]);
    }
}
