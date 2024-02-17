<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Choice extends Model
{
    use HasFactory;

    protected $fillable = [
        'choice',
        'poll_id',
        'created_at',
        'updated_at',
    ];

    public function poll(): BelongsTo
    {
        return $this->belongsTo(Poll::class);
    }
}
