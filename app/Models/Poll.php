<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Poll extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'description',
        'deadline',
        'created_by',
        'division_id',
        'created_at',
        'updated_at',
        'deleted_at'
    ];

    protected $casts = [
        'deadline' => 'datetime',
    ];

    public function creator(): BelongsTo
    {
        return $this->belongsTo(User::class, 'created_by');
    }

    public function division(): BelongsTo
    {
        return $this->belongsTo(Division::class);
    }

    public function choices(): HasMany
    {
        return $this->hasMany(Choice::class);
    }

    public function votes(): HasMany
    {
        return $this->hasMany(Vote::class);
    }
}
