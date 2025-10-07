<?php

use App\Models\User;
use App\Models\Note;
use Illuminate\Foundation\Testing\RefreshDatabase;

uses(RefreshDatabase::class);

// Test: notes page loads for authenticated user
test('notes page loads for authenticated user', function () {
    $user = User::factory()->create();

    $this->actingAs($user)
         ->get('/notes')
         ->assertStatus(200);
});

// Test: user can create a note
test('user can create a note', function () {
    $user = User::factory()->create();

    $noteData = [
        'title' => 'My Test Note',
        'description' => 'This is a test note.',
    ];

    $this->actingAs($user)
         ->post('/notes', $noteData)
         ->assertStatus(302);

    $this->assertDatabaseHas('notes', $noteData);
});

// Test: user can see created note
test('user can see created note', function () {
    $user = User::factory()->create();
    $note = Note::factory()->create();

    $this->actingAs($user)
         ->get('/notes')
         ->assertSee($note->title);
});

// Test: user can update a note
test('user can update a note', function () {
    $user = User::factory()->create();
    $note = Note::factory()->create([
        'title' => 'Old Title',
        'description' => 'Old description',
    ]);

    $updatedData = [
        'title' => 'Updated Title',
        'description' => 'Updated description',
    ];

    $this->actingAs($user)
         ->put("/notes/{$note->id}", $updatedData)
         ->assertStatus(302);

    $this->assertDatabaseHas('notes', $updatedData);
});

// Test: user can delete a note
test('user can delete a note', function () {
    $user = User::factory()->create();
    $note = Note::factory()->create(); 

    $this->actingAs($user)
         ->delete("/notes/{$note->id}")
         ->assertStatus(302);

    $this->assertDatabaseMissing('notes', [
        'id' => $note->id,
    ]);
});
